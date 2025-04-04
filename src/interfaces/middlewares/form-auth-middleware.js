import FindDoctorRepository from "../../infrastructure/repositories/doctor-repository/find-doctor-repo.js";
import doctorModal from "../../infrastructure/database/models/doctor-models.js";

export const stepTwoAuth = async (req, res, next) => {
  try {
    const doctorId = req.doctor.doctorId;
    const findDoctorRepository = new FindDoctorRepository(doctorModal);
    const doctor = await findDoctorRepository.findDoctorById(doctorId);
    if (doctor.isStepOneFormCompleted) {
      console.log("stepTwoAuth middleware passed");
      next();
    } else {
      console.log("stepTwoAuth middleware failed");
      res.redirect("/doctor/register/step1");
    }
  } catch (error) {
    console.log("Error in stepTwoAuth middleware: ", error);
    next(error);
  }
};

export const stepThreeAuth = async (req, res, next) => {
  try {
    const doctorId = req.doctor.doctorId;
    const findDoctorRepository = new FindDoctorRepository(doctorModal);
    const doctor = await findDoctorRepository.findDoctorById(doctorId);
    if (doctor.isStepTwoFormCompleted && doctor.isStepOneFormCompleted) {
      console.log("stepThreeAuth middleware passed");
      next();
    } else if (doctor.isStepOneFormCompleted) {
      console.log("stepThreeAuth middleware failed");
      res.redirect("/doctor/register/step2");
    } else {
      console.log("StepThreeAuth middleware failed");
      res.redirect("/doctor/register/step1");
    }
  } catch (error) {
    console.log("Error in stepThreeAuth middleware: ", error);
    next(error);
  }
};
