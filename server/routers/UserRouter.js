const userRouter = require("express").Router();
const { register ,verifyEmail,resetOtp,login} = require("../controllers/UserController")


userRouter.post("/register", register);
userRouter.post("/verify-otp", verifyEmail);
userRouter.post("/reset-otp", resetOtp);
userRouter.post("/login", login);

module.exports = userRouter;