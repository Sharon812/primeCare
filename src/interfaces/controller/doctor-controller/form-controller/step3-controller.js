import saveStepThreeFormData from "../../../../application/use_cases/doctor-use-case/form-use-case/stepThree-from-useCase.js";
import UpdateDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/update-doctor-repo.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";
import FindDoctorDetails from "../../../../application/use_cases/doctor-use-case/find-doctor-details-useCase.js";
import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";

class DoctorStepThirdFormController {
  constructor(stepThreeFormUseCase, findDoctorDetailUseCase) {
    this.stepThreeFormUseCase = stepThreeFormUseCase;
    this.findDoctorDetailUseCase = findDoctorDetailUseCase;
  }

  stepThreeFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step three form route hit");

      const doctorDetails = await this.findDoctorDetailUseCase.execute(
        req.doctor.doctorId
      );

      res.render("form-step3", {
        doctorDetails: {
          consultationFee: doctorDetails.consultationFee || "",
          adminFee: doctorDetails.adminFee || "",
          doctorEarnings: doctorDetails.doctorEarnings || "",
          termsAccepted: doctorDetails.termsAccepted || false,
          privacyAccepted: doctorDetails.privacyAccepted || false,
        },
      });
    } catch (error) {
      console.log("stepThreeFormRender Controller Error", error);
      next(error);
    }
  };

  stepThreeForm = async (req, res, next) => {
    try {
      console.log("Received Data", req.body);

      const doctorId = req.doctor.doctorId;

      const updatedData = {
        consultationFee: req.body.consultationFee,
        adminFee: req.body.adminFee,
        doctorEarnings: req.body.doctorEarnings,
        termsAccepted: req.body.termsAccepted,
        privacyAccepted: req.body.privacyAccepted,
      };

      const stepTwoFormData = await this.stepThreeFormUseCase.execute(
        doctorId,
        updatedData
      );

      console.log("Step Two Form Data", stepTwoFormData);

      res.status(200).json({
        message: "Form submitted successfully",
        data: stepTwoFormData,
      });
    } catch (error) {
      console.log("stepThreeForm Controller Error", error);
      next(error);
    }
  };
}

const updateDoctorRepository = new UpdateDoctorRepository(doctorModal);
const stepThreeFormUseCase = new saveStepThreeFormData(updateDoctorRepository);
const findDoctorRepository = new FindDoctorRepository(doctorModal);
const findDoctorDetailUseCase = new FindDoctorDetails(findDoctorRepository);

export const doctorStepThirdFormController = new DoctorStepThirdFormController(
  stepThreeFormUseCase,
  findDoctorDetailUseCase
);
