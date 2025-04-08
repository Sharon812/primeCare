import express from "express";
import { doctorLoginController } from "../../interfaces/controller/doctor-controller/auth-controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor-controller/auth-controller/register-controller.js";
import { doctorVerifyEmailController } from "../controller/doctor-controller/auth-controller/verify-email-controller.js";
import { doctorStepOneFormController } from "../controller/doctor-controller/form-controller/step1-controller.js";
import { doctorDashboardController } from "../controller/doctor-controller/dashboard-controller/dashboard-controller.js";
import { doctorStepSecondFormController } from "../controller/doctor-controller/form-controller/step2-controller.js";
import { doctorStepThirdFormController } from "../controller/doctor-controller/form-controller/step3-controller.js";
import { sendOtpToPhoneNumber } from "../controller/doctor-controller/auth-controller/sendOtp-toPhoneNumber.js";
import {
  protectDoctorRoute,
  preventLoggedDoctor,
} from "../middlewares/auth_middleware.js";

import {
  stepTwoAuth,
  stepThreeAuth,
} from "../middlewares/form-auth-middleware.js";
import upload from "../upload/multer-config.js";

const router = express.Router();

// These routes are handling Auth Controllers like login, register, otp.
router.get(
  "/login",
  preventLoggedDoctor,
  doctorLoginController.loginPageRender
);

router.post("/login", preventLoggedDoctor, doctorLoginController.loginDoctor);

router.get(
  "/register",
  preventLoggedDoctor,
  doctorRegisterController.registerPageRender
);

router.post(
  "/register",
  preventLoggedDoctor,
  doctorRegisterController.registerDoctor
);

router.post(
  "/send-otp",
  preventLoggedDoctor,
  doctorVerifyEmailController.sendOTP
);

router.get(
  "/verify-otp",
  preventLoggedDoctor,
  doctorVerifyEmailController.renderingOTPPage
);

router.post(
  "/verify-otp",
  preventLoggedDoctor,
  doctorVerifyEmailController.verifyEmail
);

router.get(
  "/dashboard",
  protectDoctorRoute,
  doctorDashboardController.doctorDashboardRender
);

router.get(
  "/send-otp-to-phone",
  protectDoctorRoute,
  sendOtpToPhoneNumber.sendOtpPageRender
);

router.post(
  "/send-otp-to-phone",
  protectDoctorRoute,
  sendOtpToPhoneNumber.sendOtp
);

router.get(
  "/register/step1",
  protectDoctorRoute,
  doctorStepOneFormController.stepOneFormRender
);

router.post(
  "/register/step1",
  protectDoctorRoute,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  doctorStepOneFormController.stepOneForm
);

router.get(
  "/register/step2",
  protectDoctorRoute,
  stepTwoAuth,
  doctorStepSecondFormController.stepTwoFormRender
);

router.post(
  "/register/step2",
  protectDoctorRoute,
  stepTwoAuth,
  upload.fields([
    { name: "certification", maxCount: 1 },
    { name: "experience", maxCount: 1 },
  ]),
  doctorStepSecondFormController.stepTwoForm
);

router.get(
  "/register/step3",
  protectDoctorRoute,
  stepThreeAuth,
  doctorStepThirdFormController.stepThreeFormRender
);

router.post(
  "/register/step3",
  protectDoctorRoute,
  stepThreeAuth,
  doctorStepThirdFormController.stepThreeForm
);

router.get("/logout", doctorLoginController.logoutDoctor);

export const doctorRoute = router;
