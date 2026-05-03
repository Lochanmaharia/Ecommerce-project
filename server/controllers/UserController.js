const { response } = require("express");
const UserModel = require("../models/UserModel");
const sendOtpMail = require("../utils/sendOtpMail");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess, sendOk } = require("../utils/response");

// CREATE API
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(req.body)
        if (!name || !email || !password) {
            return sendBadRequest(res, "All fields are required")
        }

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return sendConflict(res, "User with this email already exists")
        }
        const encryptedPassword = cryptr.encrypt(password);
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);

        const user = await UserModel.create({
            name,
            email,
            password: encryptedPassword,
            otp: otp,
            otpExpire: Date.now() + 3 * 60 * 1000
        });
        const mailResponse = await sendOtpMail(email, otp);
        console.log(mailResponse);
        return sendCreated(res, "User registered successfully", {
            id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        return sendServerError(res, error)
    }
};


const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return sendBadRequest(res, "All fields are required")
        }

        const user = await UserModel.findOne({ email });
        if (!user || user.isVerified === false) {
            return sendNotFound(res, "User not found")
        }

        const decryptedPass = cryptr.decrypt(user.password);

        if (decryptedPass !== password) {
            return sendBadRequest(res, "Wrong Password");

        }

        return sendSuccess(res, "User logged in successfully", {
            id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        return sendServerError(res, error)
    }
};


const verifyEmail = async (req, res) => {

    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return sendNotFound(res, "User not found")
        }
        if (user.isVerified) {
            return sendBadRequest(res, "Email is already verified")
        }
        if (user.otp !== parseInt(otp)) {
            return sendBadRequest(res, "Invalid OTP")
        }
        if (user.otpExpire < Date.now()) {
            return sendBadRequest(res, "OTP has expired")
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return sendSuccess(res, "Email verified successfully")


    } catch (error) {
        return sendServerError(res, error)
    }
};

const resetOtp = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return sendNotFound(res, "User not found")
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpire = Date.now() + 3 * 60 * 1000;
        await user.save();
        const mailResponse = await sendOtpMail(email, otp);
        return sendOk(res, "OTP reset successfully")

    } catch (error) {
        return sendServerError(res, error)
    }
}

module.exports = { register, verifyEmail, resetOtp, login }