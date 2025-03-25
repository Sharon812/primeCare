import express from "express";
import { doctorLoginController } from "../controller/doctor-controller/login-controller.js";
import { doctorRegisterController } from "../controller/doctor-controller/register-controller.js";

const router = express.Router();

router.get("/login", doctorLoginController.loginPageRender);

router.get("/register", doctorRegisterController.registerPageRender);

router.post("/register", doctorRegisterController.registerDoctor);

export const doctorRoute = router;
