import express from "express";
import { doctorLoginController } from "../../interfaces/controller/doctor-controller/auth-controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor-controller/auth-controller/register-controller.js";
import { doctorVerifyEmailController } from "../controller/doctor-controller/auth-controller/verify-email-controller.js";
import { doctorStepOneFormController } from "../controller/doctor-controller/form-controller/step1-controller.js";
import { doctorDashboardController } from "../controller/doctor-controller/dashboard-controller/dashboard-controller.js";
import { doctorStepSecondFormController } from "../controller/doctor-controller/form-controller/step2-controller.js";
import {
  protectDoctorRoute,
  preventLoggedDoctor,
} from "../middlewares/auth_middleware.js";

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
  "/register/step1",
  protectDoctorRoute,
  doctorStepOneFormController.stepOneFormRender
);

router.post(
  "/register/step1",
  protectDoctorRoute,
  doctorStepOneFormController.stepOneForm
);

router.get(
  "/register/step2",
  protectDoctorRoute,
  doctorStepSecondFormController.stepTwoFormRender
);

router.get("/logout", doctorLoginController.logoutDoctor);

export const doctorRoute = router;
