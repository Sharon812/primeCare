class FindClinicRepository {
  constructor(clinicModal) {
    this.clinicModal = clinicModal;
  }

  async findClinicByEmail(email) {
    return await this.clinicModal.findOne({ email });
  }
  async findClinicById(id) {
    return await this.clinicModal.findById(id);
  }

  async findClinicByPhone(phone) {
    return await this.clinicModal.findOne({ phone });
  }
}
export default FindClinicRepository;
