class CreateDoctorRepository {
  constructor(doctorModal) {
    this.doctorModal = doctorModal;
  }

  async execute(doctorData) {
    return await this.doctorModal.create(doctorData);
  }
}

export default CreateDoctorRepository;