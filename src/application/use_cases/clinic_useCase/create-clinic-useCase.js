import AppError from "../../../utils/custom-error.js";

class CreateClinicUseCase {
  constructor(clinicRegistrationService, hashservice) {
    this.clinicRegistrationService = clinicRegistrationService;
    this.hashservice = hashservice;
  }

  async execute({
    clinicName,
    dateOfEstablishment,
    email,
    phoneNumber,
    password,
  }) {
    if (
      !clinicName ||
      !dateOfEstablishment ||
      !email ||
      !phoneNumber ||
      !password
    ) {
      throw new AppError("Clinic Data is required for registration");
    }

    const hashedPassword = await this.hashservice.hashPassword(password);
    console.log("usecase hit");

    const clinic = await this.clinicRegistrationService.registerClinic({
      clinicName,
      dateOfEstablishment,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // await doctorotp;
    return clinic;
  }
}

export default CreateClinicUseCase;
