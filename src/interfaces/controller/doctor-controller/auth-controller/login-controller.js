import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";
import HashService from "../../../../infrastructure/services/hash-service.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";
import DoctorLoginUseCase from "../../../../application/use_cases/doctor-use-case/login-doctor-useCase.js";

class DoctorLoginController {
  constructor(loginDoctorUseCase) {
    this.loginDoctorUseCase = loginDoctorUseCase;
  }

  loginPageRender = async (req, res) => {
    try {
      console.log("Doctor login page route hit");
      res.render("doctor-login");
    } catch (error) {
      console.error("loginPageRender Controller Error:", error);
      next(error);
    }
  };

  loginDoctor = async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      const doctor = await this.loginDoctorUseCase.execute({ email, password });

      console.log("Doctor after login", doctor);

      res.cookie("doctorToken", doctor.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 1000,
      });

      res.json({
        message: "Doctor logged in successfully",
        doctorId: doctor._id,
      });
    } catch (error) {
      console.log("loginDoctor Controller Error:", error);
      next(error);
    }
  };

  logoutDoctor = (req, res) => {
    res.clearCookie("doctorToken"); // Remove JWT
    res.redirect("/doctor/login"); // Redirect to login
  };
}

const hashService = new HashService();
const findDoctorRepository = new FindDoctorRepository(doctorModal);
const loginDoctorUseCase = new DoctorLoginUseCase(
  findDoctorRepository,
  hashService
);

export const doctorLoginController = new DoctorLoginController(
  loginDoctorUseCase
);
