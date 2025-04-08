import AppError from "../../../../utils/custom-error.js";

class saveStepTwoFormData {
  constructor(doctorRepository, cloudinaryService) {
    this.doctorRepository = doctorRepository;
    this.cloudinaryService = cloudinaryService;
  }

  async execute(doctorId, doctorData) {
    try {
      if (doctorData.certification) {
        doctorData.certification = await this.cloudinaryService.uploadImage(
          doctorData.certification
        );
      }

      if (doctorData.experience) {
        doctorData.experience = await this.cloudinaryService.uploadImage(
          doctorData.experience
        );
      }

      doctorData.isStepTwoFormCompleted = true;

      return await this.doctorRepository.updateDoctorById(doctorId, doctorData);
    } catch (error) {
      console.log("Step Two Form Use Case Error:", error);
      throw new AppError("Failed to save doctor step two form data.");
    }
  }
}

export default saveStepTwoFormData;
