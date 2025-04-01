import AppError from "../../../utils/custom-error.js";

class GetDoctorProfileUseCase {
  constructor(findDoctorRepository) {
    this.findDoctorRepository = findDoctorRepository;
  }

  async execute(doctorId) {
    if (!doctorId) {
      throw new AppError("Doctor ID is required", 400);
    }

    const doctor = await this.findDoctorRepository.findDoctorById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    return doctor;
  }
  
}

export default GetDoctorProfileUseCase;

