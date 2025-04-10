import AppError from "../../../../utils/custom-error.js";
import DoctorWelcomeEmail from "../../../../infrastructure/services/doctor-welcome-mail.js";

class saveStepFourFormData {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(doctorId) {
    try {
      let doctorData = {};
      doctorData.isFormCompleted = true;

      console.log("Final Data to Save:", doctorData);

      const updatedDoctor = await this.doctorRepository.updateDoctorById(doctorId, doctorData);

      const doctorWelcomeEmail = new DoctorWelcomeEmail();
      await doctorWelcomeEmail.sendWelcomeEmail(doctorId);
      return updatedDoctor;

    } catch (error) {
      console.error("Step Four Form Use Case Error:", error);
      throw new AppError("Failed to save doctor step four form data.");
    }
  }
}

export default saveStepFourFormData;
