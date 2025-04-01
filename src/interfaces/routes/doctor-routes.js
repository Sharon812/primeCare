import express from "express";
import { doctorLoginController } from "../../interfaces/controller/doctor-controller/auth-controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor-controller/auth-controller/register-controller.js";
import { doctorVerifyEmailController } from '../controller/doctor-controller/auth-controller/verify-email-controller.js';
import { doctorStepOneFormController } from "../controller/doctor-controller/form-controller/step1-controller.js";

const router = express.Router();

// These routes are handling Auth Controllers like login, register, otp.
router.get("/login", doctorLoginController.loginPageRender);

router.post("/login", doctorLoginController.loginDoctor);

router.get("/register", doctorRegisterController.registerPageRender);

router.post("/register", doctorRegisterController.registerDoctor);

router.post("/send-otp", doctorVerifyEmailController.sendOTP);

router.get('/verify-otp', doctorVerifyEmailController.renderingOTPPage);

router.post('/verify-otp', doctorVerifyEmailController.verifyEmail);


router.get("/register/step1",doctorStepOneFormController.stepOneFormRender);

export const doctorRoute = router;
