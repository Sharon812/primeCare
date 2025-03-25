class DoctorRepository {
  constructor(database) {
    this.database = database; // Injecting Database dependency
  }

  // Stores the initial registration information of the doctor
  async createDoctor(doctorData) {
    return await this.database.insertOne("doctors", doctorData);
  }

  // Check if the doctor with the given email exists
  async findDoctorByEmail(email) {
    return await this.database.findOne("doctors", { email });
  }

  // Check if the doctor with the given phone exists
  async findDoctorByPhone(phone) {
    return await this.database.findOne("doctors", { phone });
  }

  // Check if the doctor with the given ID exists
  async findDoctorById(doctorId) {
    return await this.database.findOne("doctors", { _id: doctorId });
  }

  // Update the doctor details dynamically
  async updateDoctorById(doctorId, updateData) {
    return await this.database.updateOne(
      "doctors",
      { _id: doctorId },
      updateData
    );
  }

  // Fetches all doctors with optional filters
  async getDoctors(filters = {}) {
    return await this.database.find("doctors", filters);
  }

  // Delete the doctor with the given ID
  async deleteDoctorById(doctorId) {
    return await this.database.deleteOne("doctors", { _id: doctorId });
  }
}

export default DoctorRepository;
