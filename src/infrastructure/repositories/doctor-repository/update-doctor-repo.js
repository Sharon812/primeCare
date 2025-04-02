class UpdateDoctorRepository {
  constructor(doctorModel) {
    this.doctorModel = doctorModel;
  }

  async execute(doctorId, updateData) {
    return this.doctorModel.findByIdAndUpdate(doctorId, updateData, { new: true });
  }
}

module.exports = UpdateDoctorRepository;
