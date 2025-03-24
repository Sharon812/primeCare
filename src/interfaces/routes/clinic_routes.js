import express from "express";
const clinicRoute = express.Router();
import clinicAuthController from "../controller/authentication/clinicAuthController.js";

clinicRoute.get("/signup", clinicAuthController.renderStep1);

export default clinicRoute;
