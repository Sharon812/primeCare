import AppError from "../../../utils/custom-error.js";

class VerifyEmailOTPUseCase {
  constructor(updateDoctorRepository, otpService) {
    this.updateDoctorRepository = updateDoctorRepository;
    this.otpService = otpService;
  }

  async execute(email, otp) {
    const isValid = await this.otpService.verifyOTP(email, otp);
    if (!isValid) {
      throw new AppError("Invalid OTP", 400);
    }

    const updateDoctor = await this.updateDoctorRepository.updateDoctorByEmail(
      email,
      { isEmailVerified: true }
    );

    if (!updateDoctor) {
      throw new AppError("Doctor not found", 404);
    }

    console.log("Doctor after email verification", updateDoctor);

    return updateDoctor;
  }
}

export default VerifyEmailOTPUseCase;
