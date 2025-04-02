import clinicRespository from "../../../domain/respositories/clinic-repository/clinic-repository.js";

class CreateClinicRepository extends clinicRespository {
  constructor(clinicModal) {
    super();
    this.clinicModal = clinicModal;
  }
  async createClinic(clinic) {
    const clinicData = {
      ClinicName: clinic.name,
      email: clinic.email,
      password: clinic.password,
      phoneNumber: clinic.phone,
      dateOfEstablishment: clinic.dateOfEstablishment,
    };
    return await this.clinicModal.create(clinicData);
  }
}

export default CreateClinicRepository;
