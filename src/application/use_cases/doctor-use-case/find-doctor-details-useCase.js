import AppError from "../../../utils/custom-error.js";

class FindDoctorDetails {
  constructor(findDoctorRepository) {
    this.findDoctorRepository = findDoctorRepository;
  }

  async execute(doctorId) {
    if (!doctorId) {
      throw new AppError("Doctor ID is required to find doctor details.");
    }

    const doctorDetails = await this.findDoctorRepository.findDoctorById(
      doctorId
    );
    if (!doctorDetails) {
      throw new AppError("Doctor not found.");
    }

    return doctorDetails;
  }
}

export default FindDoctorDetails;