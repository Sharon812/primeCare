class CreateDoctorUseCase {
  constructor(DoctorRegistrationService, hashService) {
    this.DoctorRegistrationService = DoctorRegistrationService;
    this.hashService = hashService;
  }

  async execute({ name, email, password, phone }) {
    if (!name || !email || !password || !phone) {
      throw new Error("Doctor data is required for registration.");
    }
    const hashedPassword = await this.hashService.hashPassword(password);

    return await this.DoctorRegistrationService.registerDoctor({
      name,
      email,
      password: hashedPassword,
      phone,
    });
  }
}

export default CreateDoctorUseCase;
