class DeleteDoctorRepository {
  constructor(doctorModel) {
    this.doctorModel = doctorModel;
  }

  async execute(doctorId) {
    return this.doctorModel.findByIdAndDelete(doctorId);
  }
}

module.exports = DeleteDoctorRepository;
