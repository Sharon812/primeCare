class saveStepOneFormData {
  constructor(doctorRepository, cloudinaryService) {
    this.doctorRepository = doctorRepository;
    this.cloudinaryService = cloudinaryService;
  }

  async execute(doctorId, doctorData) {
    try {
      if (doctorData.profileimage) {
        doctorData.profileimage = await this.cloudinaryService.uploadImage(
          doctorData.profileimage
        );
      }

      if (doctorData.idproof) {
        doctorData.idproof = await this.cloudinaryService.uploadImage(
          doctorData.idproof
        );
      }

      doctorData.isStepOneFormCompleted = true;

      console.log("Final Data to Save:", doctorData);

      return await this.doctorRepository.updateDoctorById(doctorId, doctorData);
    } catch (error) {
      console.error("Step One Form Use Case Error:", error);
      throw new AppError("Failed to save doctor step one form data.");
    }
  }
}

export default saveStepOneFormData;
