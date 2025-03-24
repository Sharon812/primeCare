class Clinic {
  constructor({ clinicName, registerNumber, email, phone }) {
    if (!clinicName || !registerNumber || !email || !phone) {
      throw new Error("All clinic fields are required.");
    }

    this.clinicName = clinicName;
    this.registerNumber = registerNumber;
    this.email = email;
    this.phone = phone;
    this.otp = this.generateOTP(); // Generate OTP on creation
    this.status = "Pending OTP Verification";
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

export default new Clinic();
