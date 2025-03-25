class DoctorConsultationRepository {
  constructor(database) {
    this.database = database; // Injecting Database dependency
    this.collection = "doctors"; // Collection name to a constant
  }

  // Update doctor consultation fee and available days
  async updateDoctorConsultation(
    doctorId,
    { originalFee, finalFee, availableDays }
  ) {
    return await this.database.updateOne(
      this.collection,
      { _id: doctorId },
      {
        originalConsultationFee: originalFee,
        finalConsultationFee: finalFee,
        availableDays,
      }
    );
  }
}

export default DoctorConsultationRepository;
