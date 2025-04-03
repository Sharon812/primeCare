import SaveStepOneFormData from "../../../../application/use_cases/doctor-use-case/form-use-case/stepOne-form-useCase.js";
import UpdateDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/update-doctor-repo.js";
import CloudinaryService from "../../../../infrastructure/services/CloudinaryService.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";

class DoctorStepOneFormController {
  constructor(stepOneFormUseCase) {
    this.stepOneFormUseCase = stepOneFormUseCase;
  }

  stepOneFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step one form route hit");
      res.render("form-step1");
    } catch (error) {
      console.log("stepOneFormRender Controller Error:", error);
      next(error);
    }
  };

  stepOneForm = async (req, res, next) => {
    try {
      console.log("Received form data:", req.body);
      console.log("Received files:", req.files);
      const doctorId = req.doctor.doctorId;

      const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        age: req.body.age,
        country: req.body.country,
        state: req.body.state,
        district: req.body.district,
        locality: req.body.locality,
        pincode: req.body.pincode,
        address: req.body.address,
        idType: req.body.idType,
        profileimage: req.files?.profileimage
          ? req.files.profileimage[0]
          : null,
        idproof: req.files?.idproof ? req.files.idproof[0] : null,
      };

      const stepOneFormData = await this.stepOneFormUseCase.execute(
        doctorId,
        updateData
      );

      console.log("stepOneFormData:", stepOneFormData);

      res.json({
        message: "Form submitted successfully",
        data: req.body,
      });
    } catch (error) {
      console.log("stepOneForm Controller Error:", error);
      next(error);
    }
  };
}

const cloudinaryService = new CloudinaryService();
const updateDoctorRepository = new UpdateDoctorRepository(doctorModal);
const stepOneFormUseCase = new SaveStepOneFormData(
  updateDoctorRepository,
  cloudinaryService
);

export const doctorStepOneFormController = new DoctorStepOneFormController(
  stepOneFormUseCase
);
