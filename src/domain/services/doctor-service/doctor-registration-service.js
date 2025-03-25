import Doctor from "../../entities/doctor-entity.js";

class DoctorRegistrationService {
  constructor(doctorRepository, findDoctorRepo) {
    this.doctorRepository = doctorRepository;
    this.findDoctorRepo = findDoctorRepo;
  }

  async registerDoctor(doctorData) {
    //check if the doctor already exists
    const existingDoctorByEmail = await this.findDoctorRepo.findDoctorByEmail(doctorData.email);
    if (existingDoctorByEmail) {
      throw new Error("Doctor with this email already exists.");
    }
    const doctor = new Doctor(doctorData);
    return await this.doctorRepository.createDoctor(doctor);
  }
}

export default DoctorRegistrationService;