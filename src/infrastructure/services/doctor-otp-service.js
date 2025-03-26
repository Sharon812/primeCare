import nodemailer from "nodemailer";
import OTP from "../database/models/otp-model.js";

class OTPService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gamil",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async generateAndSendOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    //Save the otp to the database
    await OTP.create({ email, otp });

    //Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await this.transporter.sendMail(mailOptions);

    return otp; // Return the OTP for testing purposes.
  }

  async verifyOTP(email, otp) {
    const record = await OTP.findOne({ email });

    if (record && record.otp === otp) {
      // Delete the OTP record after successful verification
      await OTP.deleteOne({ email });
      return true;
    }
    return false;
  }
}

export default new OTPService();