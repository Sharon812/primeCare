import DoctorRepository from "../../../domain/respositories/doctor-repository/doctor-repository.js";

class CreateDoctorRepository extends DoctorRepository{
  constructor(doctorModal) {
    super();
    this.doctorModal = doctorModal;
  }

  async createDoctor(doctor) {
    const doctorData = {
      name: doctor.name,
      email: doctor.email,
      password: doctor.password,
      phone: doctor.phone,
      isEmailVerified: doctor.isEmailVerified,
      isPhoneVerified: doctor.isPhoneVerified,
      isFormCompleted: doctor.isFormCompleted,
      isAdminVerified: doctor.isAdminVerified,
    } 
    return await this.doctorModal.create(doctorData);
  }
}

export default CreateDoctorRepository;