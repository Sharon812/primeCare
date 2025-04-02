import VerifyEmailOTPUseCase from "../../../application/use_cases/doctor-use-case/verify-email-otp-useCase.js";
import DoctorRepository from "../../../infrastructure/repositories/doctor-repository/create-doctor-repo.js";
import OTPService from "../../../infrastructure/services/doctor-otp-service.js";
import DoctorModal from "../../../infrastructure/database/models/doctor-models.js";

class VerifyEmailController {
  constructor(verifyEmailOTPUseCase, otpService) {
    this.verifyEmailOTPUseCase = verifyEmailOTPUseCase;
    this.otpService = otpService;
  }

  renderingOTPPage = async (req, res, next) => {
    try {
      res.render("otp-page", {
        title: "Verify Email",
      });
    } catch (error) {
      console.log("Error in renderingOTPPageController", error);
      next(error);
    }
  };

  sendOTP = async (req, res, next) => {
    try {
      const { email } = req.body;
      await this.otpService.sendOTP(email);
      res.status(200).json({
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.log("Error in sendOTPController", error);
      next(error);
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      console.log("Data in verifyEmailController", req.body);
      const { email, otp } = req.body;
      const doctor = await this.verifyEmailOTPUseCase.execute({ email, otp });
      res.json({
        message: "Email verified successfully",
        data: doctor,
      });
    } catch (error) {
      console.log("Error in verifyEmailController", error);
      next(error);
    }
  };
}

const doctorRepository = new DoctorRepository(DoctorModal);
const verifyEmailOTPUseCase = new VerifyEmailOTPUseCase(
  doctorRepository,
  OTPService
);

export const doctorVerifyEmailController = new VerifyEmailController(
  verifyEmailOTPUseCase
);
