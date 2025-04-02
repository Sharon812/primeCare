class FindDoctorRepository {
  constructor(doctorModal) {
    this.doctorModal = doctorModal;
  }

  async findDoctorByEmail(email) {
    return await this.doctorModal.findOne({ email });
  }

  async findDoctorById(id) {
    return await this.doctorModal.findById(id);
  }

  async findDoctorByPhone(phone) {
    return await this.doctorModal.findOne({ phone });
  }
}

export default FindDoctorRepository;