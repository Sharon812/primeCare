import express from "express";
import { clinicRegisterController } from "../controller/clinic-controller/clinic-register-controller.js";
import { verifyClinicRegisterationOtp } from "../controller/clinic-controller/clinic-registerOtp-controller.js";

const router = express.Router();

router.get("/register", clinicRegisterController.clinicRegisterPageRender);
router.post("/register", clinicRegisterController.registerClinicFirstPart);

//for registration otp process
router.get(
  "/verify-Clinic-otp",
  verifyClinicRegisterationOtp.renderVerifyOtpPage
);

const clinicRoute = router;
export default clinicRoute;
