import AppError from "../../../../utils/custom-error.js";

class SaveStepThreeFormData {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(doctorId, doctorData) {
    try {
      doctorData.isStepThreeFormCompleted = true;

      return await this.doctorRepository.updateDoctorById(doctorId, doctorData);
    } catch (error) {
      console.log("Step Two Form Use Case Error:", error);
      throw new AppError("Failed to save doctor step two form data.");
    }
  }
}

export default SaveStepThreeFormData;
