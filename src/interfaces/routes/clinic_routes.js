import express from "express";
import { clinicRegisterController } from "../controller/clinic-controller/clinic-register-controller.js";

const router = express.Router();

router.get("/register", clinicRegisterController.clinicRegisterPageRender);
router.post("/register", clinicRegisterController.registerClinicFirstPart);

const clinicRoute = router;
export default clinicRoute;
