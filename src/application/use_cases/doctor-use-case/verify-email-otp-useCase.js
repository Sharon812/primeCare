import AppError from "../../../utils/custom-error.js";

class VerifyEmailOTPUseCase {
  constructor(doctorRepository, otpService) {
    this.doctorRepository = doctorRepository;
    this.otpService = otpService;
  }

  async execute(email, otp) {
    const isValid = await this.otpService.verifyOTP(email, otp);
    if (!isValid) {
      throw new AppError("Invalid OTP", 400);
    }

    const updateDoctor = await this.doctorRepository.updateDoctorByEmail(
      email,
      { isEmailVerified: true }
    );

    if (!updateDoctor) {
      throw new AppError("Doctor not found", 404);
    }

    return updateDoctor;
  }
}

export default VerifyEmailOTPUseCase;
