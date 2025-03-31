import CreateClinicUseCase from "../../../application/use_cases/clinic_useCase/create-clinic-useCase.js";
import CreateClinicRepository from "../../../infrastructure/repositories/clinic-repository/create-clinic-repo.js";
import ClinicRegistrationService from "../../../domain/services/clinic-service/clinic-registration-service.js";
import HashService from "../../../infrastructure/services/hash-service.js";
import FindClinicRepository from "../../../infrastructure/repositories/clinic-repository/find-clinic-repo.js";
import clinicModel from "../../../infrastructure/database/models/clinic-models.js";

class ClinicRegisterController {
  constructor(createClinicUseCase) {
    this.createClinicUseCase = createClinicUseCase;
  }

  //For ClinicRegistration Page rendering (GET request)
  clinicRegisterPageRender = async (req, res) => {
    try {
      res.render("clinic-registerPage");
    } catch (error) {
      console.log(error, "error at clinicregisterpage controlle error");
    }
  };

  //Clinic register first part (POST request)
  registerClinicFirstPart = async (req, res) => {
    try {
      console.log(req.body);
      const { clinicName, dateOfEstablishment, email, phoneNumber, password } =
        req.body;

      console.log("route controller hti");
      const clinic = await this.createClinicUseCase.execute({
        clinicName,
        dateOfEstablishment,
        email,
        phoneNumber,
        password,
      });

      console.log("worked");
      res.status(201).json({ message: "clinic registered successfully" });
    } catch (error) {
      console.log(error, "error at registerclinicfirstpart controller error");
    }
  };
}

//dep
const hashService = new HashService();
const createClinicRepo = new CreateClinicRepository(clinicModel);
const findClinicRepo = new FindClinicRepository(clinicModel);
const clinicRegistrationService = new ClinicRegistrationService(
  createClinicRepo,
  findClinicRepo
);

const createClinicUseCase = new CreateClinicUseCase(
  clinicRegistrationService,
  hashService
);
export const clinicRegisterController = new ClinicRegisterController(
  createClinicUseCase
);
