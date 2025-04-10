import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";
import FindDoctorDetails from "../../../../application/use_cases/doctor-use-case/find-doctor-details-useCase.js";
import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";

class DoctorFullFormViewController {
  constructor(findDoctorDetailUseCase) {
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

  fullFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step four form route hit");
      const doctorDetails = await this.findDoctorDetailUseCase.execute(
        req.doctor.doctorId
      );
      res.render("full-form", {
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
}

const findDoctorRepository = new FindDoctorRepository(doctorModal);
const findDoctorDetailUseCase = new FindDoctorDetails(findDoctorRepository);

export const doctorFullFormViewController = new DoctorFullFormViewController(
  findDoctorDetailUseCase
);
