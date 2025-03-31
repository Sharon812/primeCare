import AppError from "../../../utils/custom-error.js";
import doctorOtpService from "../../../infrastructure/services/doctor-otp-service.js";

class CreateDoctorUseCase {
  constructor(DoctorRegistrationService, hashService) {
    this.DoctorRegistrationService = DoctorRegistrationService;
    this.hashService = hashService;
  }

  async execute({ name, email, password, phone }) {
    if (!name || !email || !password || !phone) {
      throw new AppError("Doctor data is required for registration.");
    }
    const hashedPassword = await this.hashService.hashPassword(password);

    const doctor = await this.DoctorRegistrationService.registerDoctor({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await doctorOtpService.generateAndSendOTP(email);

    return doctor;
  }
}

export default CreateDoctorUseCase;
