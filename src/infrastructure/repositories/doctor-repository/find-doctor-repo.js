class FindDoctorRepository {
  constructor(doctorModal) {
    this.doctorModal = doctorModal;
  }

  async byEmail(email) {
    return await this.doctorModal.findOne({ email });
  }

  async byId(id) {
    return await this.doctorModal.findById(id);
  }

  async byPhone(phone) {
    return await this.doctorModal.findOne({ phone });
  }
}

export default FindDoctorRepository;