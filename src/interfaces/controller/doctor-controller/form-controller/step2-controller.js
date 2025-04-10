import saveStepTwoFormData from "../../../../application/use_cases/doctor-use-case/form-use-case/stepTwo-form-useCase.js";
import UpdateDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/update-doctor-repo.js";
import CloudinaryService from "../../../../infrastructure/services/CloudinaryService.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";
import FindDoctorDetails from "../../../../application/use_cases/doctor-use-case/find-doctor-details-useCase.js";
import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";

class DoctorStepSecondFormController {
  constructor(stepTwoFormUseCase, findDoctorDetailUseCase) {
    this.stepTwoFormUseCase = stepTwoFormUseCase;
    this.findDoctorDetailUseCase = findDoctorDetailUseCase;
  }

  stepTwoFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step two form route hit");

      const doctorDetails = await this.findDoctorDetailUseCase.execute(
        req.doctor.doctorId
      );

      console.log("Doctor Details:", doctorDetails);

      res.render("form-step2", {
        doctorDetails: {
          qualification: doctorDetails.qualification || "",
          specialization: doctorDetails.specialization || "",
          university: doctorDetails.university || "",
          graduationYear: doctorDetails.graduationYear || "",
          studyCountry: doctorDetails.studyCountry || "",
          yearsOfExperience: doctorDetails.yearsOfExperience || "",
          previousHospital: doctorDetails.previousHospital || "",
          certification: doctorDetails.certification || null,
          experience: doctorDetails.experience || null,
        },
      });
    } catch (error) {
      console.log("stepTwoFormRender Controller Error:", error);
      next(error);
    }
  };

  stepTwoForm = async (req, res, next) => {
    try {
      console.log("Received Data:", req.body);
      console.log("Received Files:", req.files);

      const doctorId = req.doctor.doctorId;

      const updatedData = {
        qualification: req.body.qualification,
        specialization: req.body.specialization,
        university: req.body.university,
        graduationYear: req.body.graduationYear,
        studyCountry: req.body.studyCountry,
        yearsOfExperience: req.body.yearsOfExperience,
        previousHospital: req.body.previousHospital,
        certification: req.files?.certification
          ? req.files.certification[0].buffer
          : null,
        experience: req.files?.experience
          ? req.files.experience[0].buffer
          : null,
      };

      const stepTwoFormData = await this.stepTwoFormUseCase.execute(
        doctorId,
        updatedData
      );
      console.log("Step Two Form Data:", stepTwoFormData);

      // Return success response
      res.status(200).json({
        message: "Form submitted successfully",
        data: stepTwoFormData,
      });
    } catch (error) {
      console.log("stepTwoForm Controller Error:", error);
      next(error);
    }
  };
}

const cloudinaryService = new CloudinaryService();
const updateDoctorRepository = new UpdateDoctorRepository(doctorModal);
const stepTwoFormUseCase = new saveStepTwoFormData(
  updateDoctorRepository,
  cloudinaryService
);
const findDoctorRepository = new FindDoctorRepository(doctorModal);
const findDoctorDetailUseCase = new FindDoctorDetails(findDoctorRepository);

export const doctorStepSecondFormController =
  new DoctorStepSecondFormController(
    stepTwoFormUseCase,
    findDoctorDetailUseCase
  );
