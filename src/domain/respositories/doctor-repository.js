class DoctorRepository {
  constructor(database) {
    this.database = database; // injecting Database dependency
  }

  //Stores the initial registration information of the doctor
  async createDoctor(doctorData) {
    const doctor = await this.database.insertOne("doctors", doctorData);
    return doctor;
  }

  //Check if the doctor with the given email exists
  async findDoctorByEmail(email) {
    return await this.database.findOne("doctors", { email });
  }

  //Check if the doctor with the given phone exists
  async findDoctorByPhone(phone) {
    return await this.database.findOne("doctors", { phone });
  }

  //Check if the doctor with the given id exists
  async findDoctorById(id) {
    return await this.database.findOne("doctors", { id });
  }

  //Update the doctor details dynamically
  async updateDoctorById(doctorId, updateData) {
    return await this.database.updateOne(
      "doctors",
      { _id: doctorId },
      updateData
    );
  }

  //Update verification status of the doctor
  async updateVerificationStatus(doctorId, verificationType, status) {
    const updateField = {};
    updateField[verificationType] = status;
    return await this.database.updateOne(
      "doctors",
      { _id: doctorId },
      updateField
    );
  }

  //Update doctor Consultation fee
  async updateDoctorConsultationFee(
    doctorId,
    { originalFee, finalFee, availableDays }
  ) {
    return await this.database.updateOne(
      "doctors",
      { _id: doctorId },
      {
        originalConsultationFee: originalFee,
        finalConsultationFee: finalFee,
        availableDays,
      }
    );
  }

  //Fetches all the doctors with optional filters
  async getDoctors(filters = {}) {
    return await this.database.find("doctors", filters);
  }

  //Delete the doctor with the given id
  async deleteDoctorById(doctorId) {
    return await this.database.deleteOne("doctors", { _id: doctorId });
  }
}

export default DoctorRepository;