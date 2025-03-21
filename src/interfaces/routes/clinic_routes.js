import express from "express";
const clinicRoute = express.Router();
import {
  renderRegisterPage,
  renderRegisterPageSecondStep,
  renderRegisterPageThirdStep,
} from "../controller/clinic_controller/clinic_register.js";

clinicRoute.get("/signup", renderRegisterPage);
clinicRoute.get("/signup2", renderRegisterPageSecondStep);
clinicRoute.get("/signup3", renderRegisterPageThirdStep);

export default clinicRoute;
