class saveStepOneFormData {
  constructor(doctorRepository, cloudinaryService) {
    this.doctorRepository = doctorRepository;
    this.cloudinaryService = cloudinaryService;
  }

  async execute(doctorId, doctorData) {
    if (doctorData.profileImage) {
      doctorData.profileImage = await this.cloudinaryService.uploadImage(
        doctorData.profileImage
      );
    }

    if (doctorData.idProof) {
      doctorData.idProof = await this.cloudinaryService.uploadImage(
        doctorData.idProof
      );
    }

    doctorData.isStepOneFormCompleted = true;

    console.log("data from repo",doctorData);

    return await this.doctorRepository.updateDoctorById(doctorId, doctorData);
  }
}

export default saveStepOneFormData;
