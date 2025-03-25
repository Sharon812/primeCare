import Doctor from "../../entities/doctor-entity";

class DoctorRegistrationService {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async registerDoctor(doctorData) {
    const doctor = new Doctor(doctorData);
    const savedDoctor = await this.doctorRepository.createDoctor(doctor);
    return savedDoctor;
  }
}

export default DoctorRegistrationService;