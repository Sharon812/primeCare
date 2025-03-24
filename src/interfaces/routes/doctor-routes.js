import express from "express";
import { loginPageRender } from "../controller/doctor_controller/login-controller.js";

const router = express.Router();

router.get("/login", loginPageRender);

export const doctorRoute = router;
