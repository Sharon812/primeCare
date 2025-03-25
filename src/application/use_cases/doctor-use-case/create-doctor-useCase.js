class CreateDoctorUseCase {
  constructor( doctorRepository, hashService){
    this.doctorRepository = doctorRepository;
    this.hashService = hashService;
  }

  async execute(name, email, password, phone){
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
    }

    return this.doctorRepository.createDoctor(doctorData);
  }
}

export default CreateDoctorUseCase;