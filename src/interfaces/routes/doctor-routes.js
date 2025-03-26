import express from "express";
import { doctorLoginController } from "../controller/doctor-controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor-controller/register-controller.js";
import { doctorVerifyEmailController } from '../controller/doctor-controller/verify-email-controller.js';

const router = express.Router();

router.get("/login", doctorLoginController.loginPageRender);

router.get("/register", doctorRegisterController.registerPageRender);

router.post("/register", doctorRegisterController.registerDoctor);

router.post("/send-otp", doctorVerifyEmailController.sendOTP);

router.get('/verify-otp', doctorVerifyEmailController.renderingOTPPage);

router.post('/verify-otp', doctorVerifyEmailController.verifyEmail);

export const doctorRoute = router;
