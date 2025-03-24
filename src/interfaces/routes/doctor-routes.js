import express from "express";
import { doctorLoginController } from "../controller/doctor_controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor_controller/register-controller.js";

const router = express.Router();

router.get("/login", doctorLoginController.loginPageRender);

router.get("/register", doctorRegisterController.registerPageRender);

export const doctorRoute = router;
