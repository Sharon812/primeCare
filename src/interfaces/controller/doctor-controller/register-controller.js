import CreateDoctorUseCase from "../../../application/use_cases/doctor-use-case/create-doctor-useCase.js";
import CreateDoctorRepository from "../../../infrastructure/repositories/doctor-repository/create-doctor-repo.js";
import FindDoctorRepository from "../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";
import DoctorRegistrationService from "../../../domain/services/doctor-service/doctor-registration-service.js";
import HashService from "../../../infrastructure/services/hash-service.js";
import doctorModal from "../../../infrastructure/database/models/doctor-models.js";

class DoctorRegisterController {
  constructor(createDoctorUseCase) {
    this.createDoctorUseCase = createDoctorUseCase;
  }

  // Doctor Register Page Render (GET Request)
  registerPageRender = async (req, res) => {
    try {
      console.log("Doctor register page route hit");
      res.render("doctor-register");
    } catch (error) {
      console.log("registerPageRender Controller Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  // Doctor Register (POST Request)
  registerDoctor = async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, phone, password } = req.body;
      const doctor = await this.createDoctorUseCase.execute({
        name,
        email,
        phone,
        password,
      });

      res.status(201).json({
        message: "Doctor Registered Successfully",
        doctorId: doctor._id,
      });
    } catch (error) {
      console.log("registerDoctor Controller Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}

//Dependency Injection
const hashService = new HashService();
const createDoctorRepo = new CreateDoctorRepository(doctorModal);
const findDoctorRepo = new FindDoctorRepository(doctorModal);
const doctorRegistrationService = new DoctorRegistrationService(
  createDoctorRepo,
  findDoctorRepo
);
const createDoctorUseCase = new CreateDoctorUseCase(
  doctorRegistrationService,
  hashService
);

export const doctorRegisterController = new DoctorRegisterController(
  createDoctorUseCase
);
