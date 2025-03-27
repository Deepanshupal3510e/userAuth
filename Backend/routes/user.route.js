import { Router } from 'express'
import { getUserDetails, handleUserLogin, sendEmailForgotPassword, sendEmailVerifyOtpController, userRegisterController, vefiyuserEmailController, verifyandChangePassword } from '../controllers/user.controller.js';
import { authMiddelware } from '../Middlewares/auth.js';

const userRouter = Router();


userRouter.post("/register" , userRegisterController)
userRouter.post("/login" , handleUserLogin)
userRouter.get("/get-user-details" , authMiddelware , getUserDetails)
userRouter.get("/get-email-verification-otp",authMiddelware , sendEmailVerifyOtpController)
userRouter.post('/verify-email' , authMiddelware , vefiyuserEmailController)
userRouter.post("/send-otp-forgot-password" , sendEmailForgotPassword)
userRouter.post("/verify-otp-reset-password" , verifyandChangePassword)

export default userRouter;
