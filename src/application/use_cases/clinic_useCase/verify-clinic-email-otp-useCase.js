import AppError from "../../../utils/custom-error.js";

class VerifyClinicEmailOtpUseCase {
  constructor(clinicRepository, otpService) {
    this.clinicRepository = clinicRepository;
    this.otpService = otpService;
  }
  async execute(email, otp) {
    const isValid = await this.otpService.verifyOTP(email, otp);
    if (!isValid) {
      throw new AppError("Invalid OTP", 400);
    }
    const updateClinic = await this.clinicRepository.updateClinicByEmail(
      email,
      { isEmailVerified: true }
    );
    if (!updateClinic) {
      throw new AppError("Clinic not found", 404);
    }
    return updateClinic;
  }
}

export default VerifyClinicEmailOtpUseCase;
