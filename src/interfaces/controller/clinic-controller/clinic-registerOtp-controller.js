import CreateClinicRepository from "../../../infrastructure/repositories/clinic-repository/create-clinic-repo.js";
import ClinicModal from "../../../infrastructure/database/models/clinic-models.js";
import clinicOtpService from "../../../infrastructure/services/clinic-otp-service.js";
import VerifyClinicEmailOtpUseCase from "../../../application/use_cases/clinic_useCase/verify-clinic-email-otp-useCase.js";

class VerifyClinicRegisterationOtp {
  //For rendering the verify otp page
  renderVerifyOtpPage = async (req, res, next) => {
    try {
      res.render("clinic-registerOtpPage");
    } catch (error) {
      console.log(
        error,
        "error at renderverifyotpPage in clinic-register-otp controller"
      );
      next(error);
    }
  };
  verifyClinicOtp = async (req, res, next) => {
    try {
      const { otp } = req.body;
      const clinic = await this.verifyClinicRegisterationOtp.execute(otp);
      res.status(200).json({ message: "Clinic registered successfully" });
    } catch (error) {
      console.log(error, "error at verifyClinicOtp controller error");
      next(error);
    }
  };
}
const clinicRepository = new CreateClinicRepository(ClinicModal);
const verifyClinicEmailOtpUseCase = new VerifyClinicEmailOtpUseCase(
  clinicRepository,
  clinicOtpService
);
export const verifyClinicRegisterationOtp = new VerifyClinicRegisterationOtp(
  verifyClinicEmailOtpUseCase
);
