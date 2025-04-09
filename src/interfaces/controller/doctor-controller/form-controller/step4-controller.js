import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";
import FindDoctorDetails from "../../../../application/use_cases/doctor-use-case/find-doctor-details-useCase.js";
import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";
import saveStepFourFormData from "../../../../application/use_cases/doctor-use-case/form-use-case/stepFour-form-useCase.js";
import UpdateDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/update-doctor-repo.js";

class DoctorStepFourthFormController {
  constructor(findDoctorDetailUseCase, stepFourFormUseCase) {
    this.stepFourFormUseCase = stepFourFormUseCase;
    this.findDoctorDetailUseCase = findDoctorDetailUseCase;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  stepFourFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step four form route hit");
      const doctorDetails = await this.findDoctorDetailUseCase.execute(
        req.doctor.doctorId
      );
      res.render("form-step4", {
        doctorDetails: {
          firstname: doctorDetails.firstName,
          lastname: doctorDetails.lastName,
          dob: this.formatDate(doctorDetails.dob),
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
          consultationFee: doctorDetails.consultationFee,
          adminFee: doctorDetails.adminFee,
          doctorEarnings: doctorDetails.doctorEarnings,
          termsAccepted: doctorDetails.termsAccepted,
          privacyAccepted: doctorDetails.privacyAccepted,
          experience: doctorDetails.experience,
          certification: doctorDetails.certification,
          qualification: doctorDetails.qualification,
          specialization: doctorDetails.specialization,
          university: doctorDetails.university,
          graduationYear: doctorDetails.graduationYear,
          studyCountry: doctorDetails.studyCountry,
          yearsOfExperience: doctorDetails.yearsOfExperience,
          previousHospital: doctorDetails.previousHospital,
        },
      });
    } catch (error) {
      console.log("stepFourFormRender Controller Error", error);
      next(error);
    }
  };

  stepFourForm = async (req, res, next) => {
    try {
      console.log("Received Data", req.body);
      const doctorId = req.doctor.doctorId;

      const stepFourFormData = await this.stepFourFormUseCase.execute(doctorId);

      console.log("Step Four Form Data", stepFourFormData);

      if (stepFourFormData) {
        res.status(200).json({
          success: true,
          message: "Application submitted successfully",
          redirectUrl: "/doctor/dashboard",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to submit application",
        });
      }
    } catch (error) {
      console.log("stepFourForm Controller Error", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while submitting the application",
      });
    }
  };
}

const findDoctorRepository = new FindDoctorRepository(doctorModal);
const findDoctorDetailUseCase = new FindDoctorDetails(findDoctorRepository);
const updateDoctorRepository = new UpdateDoctorRepository(doctorModal);
const stepFourFormUseCase = new saveStepFourFormData(updateDoctorRepository);

export const doctorStepFourthFormController =
  new DoctorStepFourthFormController(
    findDoctorDetailUseCase,
    stepFourFormUseCase
  );
