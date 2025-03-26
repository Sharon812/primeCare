import AppError from "../../../utils/custom-error.js";

class DoctorRepository {
  constructor() {
    if (this.constructor === DoctorRepository) {
      throw new AppError("Abstract classes can't be instantiated.");
    }
  }

  async createDoctor(doctorData) {
    throw new AppError("Method not implemented.");
  }

  async findDoctorByEmail(email) {
    throw new AppError("Method not implemented.");
  }

  async findDoctorByPhone(phone) {
    throw new AppError("Method not implemented.");
  }

  async findDoctorById(doctorId) {
    throw new AppError("Method not implemented.");
  }

  async updateDoctorById(doctorId, updateData) {
    throw new AppError("Method not implemented.");
  }

  async updateDoctorByEmail(email, updateData) {
    throw new AppError("Method not implemented.");
  }

  async getDoctors(filters = {}) {
    throw new AppError("Method not implemented.");
  }

  async deleteDoctorById(doctorId) {
    throw new AppError("Method not implemented.");
  }
}

export default DoctorRepository;
