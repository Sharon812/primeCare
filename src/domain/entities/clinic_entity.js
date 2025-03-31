import AppError from "../../utils/custom-error.js";

class Clinic {
  constructor({
    clinicName,
    dateOfEstablishment,
    email,
    phoneNumber,
    password,
  }) {
    this.validaterequiredFields(
      clinicName,
      email,
      dateOfEstablishment,
      phoneNumber,
      password
    );
    this.validateEmail(email);
    this.validatePhone(phoneNumber);

    //Basic registration information
    this.name = clinicName;
    this.email = email;
    this.phone = phoneNumber;
    this.dateOfEstablishment = dateOfEstablishment;
    this.password = password;
  }

  validaterequiredFields(...fields) {
    fields.forEach((field) => {
      if (!field || field.trim() === "") {
        throw new AppError("Missing required fields");
      }
    });
  }

  validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email");
    }
  }

  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      throw new AppError("Invalid phone number");
    }
  }
}

export default Clinic;
