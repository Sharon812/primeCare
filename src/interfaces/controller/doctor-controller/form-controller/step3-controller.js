import saveStepThreeFormData from "../../../../application/use_cases/doctor-use-case/form-use-case/stepThree-from-useCase.js";
import UpdateDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/update-doctor-repo.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";

class DoctorStepThirdFormController {
  constructor(stepThreeFormUseCase) {
    this.stepThreeFormUseCase = stepThreeFormUseCase;
  }

  stepThreeFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step three form route hit");
      res.render("form-step3");
    } catch (error) {
      console.log("stepThreeFormRender Controller Error", error);
      next(error);
    }
  };

  stepTwoForm = async (req, res, next) => {
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
      console.log("stepTwoForm Controller Error", error);
      next(error);
    }
  };
}

const updateDoctorRepository = new UpdateDoctorRepository(doctorModal);
const stepThreeFormUseCase = new saveStepThreeFormData(updateDoctorRepository);

export const doctorStepThirdFormController = new DoctorStepThirdFormController(
  stepThreeFormUseCase
);
