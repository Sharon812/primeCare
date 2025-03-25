import Doctor from "../../../domain/entities/doctor-entity.js";

class CreateDoctorUseCase {
  constructor(createDoctorRepository, hashService) {
    this.createDoctorRepository = createDoctorRepository;
    this.hashService = hashService;
  }

  async execute({ name, email, password, phone }) {
    if (!name || !email || !password || !phone) {
      throw new Error("Doctor data is required for registration.");
    }
    const hashedPassword = await this.hashService.hashPassword(password);
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return this.createDoctorRepository.execute(doctor);
  }
}

export default CreateDoctorUseCase;
