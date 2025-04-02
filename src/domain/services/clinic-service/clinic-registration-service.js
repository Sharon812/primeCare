import Clinic from "../../entities/clinic_entity.js";
import AppError from "../../../utils/custom-error.js";

class ClinicRegistrationService {
  constructor(clinicRepository, findClinicRepo) {
    this.clinicRepository = clinicRepository;
    this.findClinicRepo = findClinicRepo;
  }
  async registerClinic(clinicData) {
    console.log("service hit");

    //check if the clinic with this email already exists
    const existingClinicByEmail = await this.findClinicRepo.findClinicByEmail(
      clinicData.email
    );
    console.log("service after amail ");

    if (existingClinicByEmail) {
      throw new AppError("clinic with this email already exists");
    }
    //check if the clinic with this phone already exists
    const existingDoctorByPhone = await this.findClinicRepo.findClinicByPhone(
      clinicData.phoneNumber
    );
    if (existingDoctorByPhone) {
      throw new AppError("Doctor with this phone already exists");
    }
    const clinic = new Clinic(clinicData);
    console.log("passed to repo");

    return await this.clinicRepository.createClinic(clinic);
  }
}
export default ClinicRegistrationService;
