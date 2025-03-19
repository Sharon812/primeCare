import express from "express";
const clinicRoute = express.Router();
import { renderRegisterPage } from "../controller/clinic_controller/clinic_register.js";

clinicRoute.get("/signup", renderRegisterPage);

export default clinicRoute;
