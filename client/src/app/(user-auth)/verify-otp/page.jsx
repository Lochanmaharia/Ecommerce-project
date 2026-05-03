'use client'
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { client, notify } from "@/utils/helper";
import { useSearchParams } from "next/navigation";

const OTPVerification = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    // console.log(email, "email from search params")
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Backspace → go to previous
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");
        setLoading(true);

        client
            .post("user/verify-otp", { email, otp : finalOtp })
            .then((response) => {
                console.log(response)
                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    console.log(response.data)
                    router.push("/login");
                }
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message || "Internal server error";
                notify(message, false);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">

            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md border border-white/40 text-center">

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Verify OTP
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Enter the 6-digit code sent to your email
                </p>

                <form onSubmit={handleSubmit}>

                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                ref={(el) => (inputsRef.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center text-xl font-semibold 
                border border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-purple-400 
                bg-white/80"
                            />
                        ))}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white font-semibold 
            bg-linear-to-r from-blue-500 to-purple-500 
            hover:from-blue-600 hover:to-purple-600 
            transition duration-300"
                    >
                        {loading ? "wait...." : "Verify OTP"}
                    </button>

                </form>

                {/* Resend */}
                <p className="text-sm text-gray-600 mt-5">
                    Didn’t receive code?{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Resend
                    </span>
                </p>

            </div>
        </div>
    );
};

export default OTPVerification;