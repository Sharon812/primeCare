import SaveStepOneFormData from "../../../../application/use_cases/doctor-use-case/form-use-case/stepOne-form-useCase.js";
import UpdateDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/update-doctor-repo.js";
import CloudinaryService from "../../../../infrastructure/services/CloudinaryService.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";
import FindDoctorDetails from "../../../../application/use_cases/doctor-use-case/find-doctor-details-useCase.js";
import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";

class DoctorStepOneFormController {
  constructor(stepOneFormUseCase, findDoctorDetailsUseCase) {
    this.findDoctorDetailsUseCase = findDoctorDetailsUseCase;
    this.stepOneFormUseCase = stepOneFormUseCase;
  }
class DoctorStepOneFormController {
  constructor() {}

  stepOneFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step one form route hit");
      const doctorDetails = await this.findDoctorDetailsUseCase.execute(
        req.doctor.doctorId
      );

      const formattedDOB = doctorDetails.dob
        ? new Date(doctorDetails.dob).toISOString().split("T")[0]
        : "";

      res.render("form-step1", {
        doctorDetails: {
          firstName: doctorDetails.firstName,
          lastName: doctorDetails.lastName,
          dob: formattedDOB,
          age: doctorDetails.age,
          country: doctorDetails.country,
          state: doctorDetails.state,
          district: doctorDetails.district,
          locality: doctorDetails.locality,
          pincode: doctorDetails.pincode,
          address: doctorDetails.address,
          idType: doctorDetails.idType,
          profileImage: doctorDetails.profileimage || null,
          idProof: doctorDetails.idproof || null,
          email: doctorDetails.email,
          phoneNumber: doctorDetails.phone,
        },
        doctorId: req.doctor.doctorId,
      });
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
        profileimage: req.files?.profileImage
          ? req.files.profileImage[0].buffer
          : null,
        idproof: req.files?.idProof ? req.files.idProof[0].buffer : null,
      };

      // Pass data to the use case
      const stepOneFormData = await this.stepOneFormUseCase.execute(
        doctorId,
        updateData
      );

      console.log("Updated Doctor Data:", stepOneFormData);

      res.json({
        message: "Form submitted successfully",
        data: stepOneFormData,
      });
    } catch (error) {
      console.log("stepOneForm Controller Error:", error);
      next(error);
    }
  };
}

const cloudinaryService = new CloudinaryService();
const updateDoctorRepository = new UpdateDoctorRepository(doctorModal);
const findDoctorRepository = new FindDoctorRepository(doctorModal);
const findDoctorDetailsUseCase = new FindDoctorDetails(findDoctorRepository);
const stepOneFormUseCase = new SaveStepOneFormData(
  updateDoctorRepository,
  cloudinaryService
);

export const doctorStepOneFormController = new DoctorStepOneFormController(
  stepOneFormUseCase,
  findDoctorDetailsUseCase
);
}

export const doctorStepOneFormController = new DoctorStepOneFormController();
