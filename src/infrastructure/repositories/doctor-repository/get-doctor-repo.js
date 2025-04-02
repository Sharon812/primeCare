class GetDocotorRepository {
  constructor(doctorModal) {
    this.doctorModal = doctorModal;
  }

  async execute(filters = {}) {
    return await this.doctorModal.find(filters);
  }
}
