import express from "express";
import { doctorLoginController } from "../../interfaces/controller/doctor-controller/auth-controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor-controller/auth-controller/register-controller.js";
import { doctorVerifyEmailController } from '../controller/doctor-controller/auth-controller/verify-email-controller.js';

const router = express.Router();

router.get("/login", doctorLoginController.loginPageRender);

router.get("/register", doctorRegisterController.registerPageRender);

router.post("/register", doctorRegisterController.registerDoctor);

router.post("/send-otp", doctorVerifyEmailController.sendOTP);

router.get('/verify-otp', doctorVerifyEmailController.renderingOTPPage);

router.post('/verify-otp', doctorVerifyEmailController.verifyEmail);

export const doctorRoute = router;
