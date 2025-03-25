class CreateDoctorUseCase {
  constructor(doctorRepository, hashService) {
    this.doctorRepository = doctorRepository;
    this.hashService = hashService;
  }

  async execute({name, email, password, phone}) {
    console.log("datas in use case:", name, email, password, phone);
    if (!name || !email || !password || !phone) {
      throw new Error("Doctor data is required for registration.");
    }
    const hashedPassword = await this.hashService.hashPassword(password);
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      phone,
      isEmailVerified: false,
      isPhoneVerified: false,
      isFormCompleted: false,
      isAdminVerified: false,
    };

    return this.doctorRepository.execute(doctorData);
  }
}

export default CreateDoctorUseCase;
