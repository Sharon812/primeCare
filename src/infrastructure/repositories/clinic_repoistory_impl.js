import clinicModel from "../database/models/clinic_model.js";
class ClinicRepository {
  async createClinic(clinicData) {
    return await clinicModel.create(clinicData);
  }

  async findClinicByEmailOrRegNo(email, regNo) {
    return await clinicModel.findOne({
      $or: [{ email }, { registerNumber: regNo }],
    });
  }
}

export default new ClinicRepository();
