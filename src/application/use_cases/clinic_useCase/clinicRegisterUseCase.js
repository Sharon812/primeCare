import emailService

class clinicUseCase {
  async registerStep1(clinicName) {
    if (!clinicName) {
      throw new Error("missing fields");
    }
  }
}

export default new clinicUseCase();
