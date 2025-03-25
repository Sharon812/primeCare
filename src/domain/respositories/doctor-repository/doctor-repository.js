class DoctorRepository {
  constructor() {
    if (this.constructor === DoctorRepository) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async createDoctor(doctorData) {
    throw new Error("Method not implemented.");
  }

  async findDoctorByEmail(email) {
    throw new Error("Method not implemented.");
  }

  async findDoctorByPhone(phone) {
    throw new Error("Method not implemented.");
  }

  async findDoctorById(doctorId) {
    throw new Error("Method not implemented.");
  }

  async updateDoctorById(doctorId, updateData) {
    throw new Error("Method not implemented.");
  }

  async getDoctors(filters = {}) {
    throw new Error("Method not implemented.");
  }

  async deleteDoctorById(doctorId) {
    throw new Error("Method not implemented.");
  }
}

export default DoctorRepository;
