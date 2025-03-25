class Doctor {
  constructor({ name, email, phone, password }) {
    this.validaterequiredFields(name, email, phone, password);
    this.validateEmail(email);
    this.validatePhone(phone);

    //Basic registration information
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;

    //varification status
    this.isEmailVerified = false;
    this.isPhoneVerified = false;
    this.isFormCompleted = false;
    this.isAdminVerified = false;

    //Profile information
    this.firstName = null;
    this.lastName = null;
    this.dob = null;
    this.age = null;
    this.gender = null;
    this.address = null;
    this.photo = null;
    this.idProof = null;

    //Education information
    this.highestQualification = null;
    this.specialization = null;
    this.medicalSchool = null;
    this.graduationYear = null;
    this.countryOfStudy = null;
    this.certificationPhoto = null;

    //Experience information
    this.yearsOfPractice = null;
    this.experienceCertificate = null;
    this.previousHospital = [];
    this.currentHospital = null;

    //consultation fee & availability
    this.originalConsultationFee = null;
    this.finalConsultationFee = null;
    this.availableDays = [];
  }

  //Validation methods

  validaterequiredFields(...fields) {
    fields.forEach((field) => {
      if (!field || field.trim() === "") {
        throw new Error("Missing required fields");
      }
    });
  }

  validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email");
    }
  }

  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Invalid phone number");
    }
  }

  // ** update methods **

  updatePersonalDetails({
    firstName,
    lastName,
    dob,
    age,
    gender,
    address,
    photo,
    idProof,
    phone,
  }) {
    if (phone) {
      this.validatePhone(phone);
    }

    this.firstName = firstName || this.firstName;
    this.lastName = lastName || this.lastName;
    this.dob = dob || this.dob;
    this.age = age || this.age;
    this.gender = gender || this.gender;
    this.address = address || this.address;
    this.photo = photo || this.photo;
    this.idProof = idProof || this.idProof;
    this.phone = phone || this.phone;
  }

  updateEducationDetails({
    highestQualification,
    specialization,
    medicalSchool,
    graduationYear,
    countryOfStudy,
    certificationPhoto,
  }) {
    this.highestQualification =
      highestQualification || this.highestQualification;
    this.specialization = specialization || this.specialization;
    this.medicalSchool = medicalSchool || this.medicalSchool;
    this.graduationYear = graduationYear || this.graduationYear;
    this.countryOfStudy = countryOfStudy || this.countryOfStudy;
    this.certificationPhoto = certificationPhoto || this.certificationPhoto;
  }

  updateExperienceDetails({
    yearsOfPractice,
    experienceCertificate,
    previousHospital,
    currentHospital,
  }) {
    this.yearsOfPractice = yearsOfPractice || this.yearsOfPractice;
    this.experienceCertificate =
      experienceCertificate || this.experienceCertificate;
    this.previousHospital = previousHospital || this.previousHospital;
    this.currentHospital = currentHospital || this.currentHospital;
  }

  updateConsultationFee({
    originalConsultationFee,
    finalConsultationFee,
    availableDays,
  }) {
    this.originalConsultationFee =
      originalConsultationFee || this.originalConsultationFee;
    this.finalConsultationFee =
      finalConsultationFee || this.finalConsultationFee;
    this.availableDays = availableDays || this.availableDays;
  }

  // ** verification methods **
  markEmailVerified() {
    this.isEmailVerified = true;
  }

  markPhoneVerified() {
    this.isPhoneVerified = true;
  }

  markFormCompleted() {
    this.isFormCompleted = true;
  }

  markAdminVerified() {
    this.isAdminVerified = true;
  }
}

export default Doctor;