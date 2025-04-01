import FindDoctorRepository from "../../../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";
import GetDoctorProfileUseCase from "../../../../application/use_cases/doctor-use-case/get-doctor-profile-useCase.js";
import doctorModal from "../../../../infrastructure/database/models/doctor-models.js";

class DoctorDashboardController {
  constructor(getDoctorProfileUseCase) {
    this.getDoctorProfileUseCase = getDoctorProfileUseCase;
  }

  doctorDashboardRender = async (req, res, next) => {
    try {
      const doctorId = req.doctor.doctorId;
      console.log(doctorId);
      const doctor = await this.getDoctorProfileUseCase.execute(doctorId);
      console.log(doctor);

      res.render("doctor-dashboard", {
        doctor: {
          name: doctor.name,
          isFormCompleted: doctor.isFormCompleted,
          isAdminVerified: doctor.isAdminVerified,
        },
      });
    } catch (error) {
      console.log("Error in doctorDashboardRenderController", error);
      next(error);
    }
  };
}

const findDoctorRepository = new FindDoctorRepository(doctorModal);
const getDoctorProfileUseCase = new GetDoctorProfileUseCase(
  findDoctorRepository
);

export const doctorDashboardController = new DoctorDashboardController(
  getDoctorProfileUseCase
);
