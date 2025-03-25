class DoctorConsultationRepository {
  constructor(database) {
    this.database = database; // Injecting Database dependency
  }

  // Update doctor consultation fee and available days
  async updateDoctorConsultation(
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
}

export default DoctorConsultationRepository;
