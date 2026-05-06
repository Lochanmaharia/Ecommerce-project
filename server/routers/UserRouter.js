const userRouter = require("express").Router();
const { register ,verifyEmail,resetOtp,login,getMe,logout,addAddress} = require("../controllers/UserController");
const { protect } = require("../middleware/auth");


userRouter.post("/register", register);
userRouter.post("/verify-otp", verifyEmail);
userRouter.post("/reset-otp", resetOtp);
userRouter.post("/login", login);
userRouter.get("/get",protect, getMe);
userRouter.get("/logout", logout);
userRouter.post("/addAddress",protect, addAddress);


module.exports = userRouter;