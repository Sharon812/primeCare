import DoctorRepository from "../../../domain/respositories/doctor-repository/doctor-repository.js";

class UpdateDoctorRepository extends DoctorRepository {
  constructor(doctorModel) {
    super();
    this.doctorModel = doctorModel;
  }

  async updateDoctorById(doctorId, updateData) {
    console.log("UpdateDoctorRepository hit", updateData)
    return this.doctorModel.findByIdAndUpdate(doctorId, updateData, {
      new: true,
    });
  }

  async updateDoctorByEmail(email, updateData) {
    return this.doctorModel.findOneAndUpdate({ email }, updateData, {
      new: true,
    });
  }
}

export default UpdateDoctorRepository;
