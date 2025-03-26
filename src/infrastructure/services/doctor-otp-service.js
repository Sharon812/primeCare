import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import OTP from "../database/models/otp-model.js";

class OTPService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
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
      subject: "Doctor Verification - PrimeCare Medical Platform",
      html: `
        <div style="background-color: #f5f3ff; padding: 40px 20px; font-family: 'Poppins', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);">
            <!-- Header with Medical Icon -->
            <div style="background: linear-gradient(135deg, #7c3aed, #5b21b6); padding: 40px 20px; text-align: center; position: relative;">
              <div style="
                width: 80px;
                height: 80px;
                background: white;
                border-radius: 50%;
                margin: 0 auto 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
              ">
                <img src="https://res.cloudinary.com/dux2ya5rb/image/upload/v1742984485/logo-icon1_fo7rad.png" 
                     alt="PrimeCare Logo" 
                     style="width: 60px; height: 60px; object-fit: contain;"
                >
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">PrimeCare</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0; font-size: 16px;">Medical Professional Verification</p>
              <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);">
                <div style="
                  background: white;
                  padding: 10px 30px;
                  border-radius: 30px;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                  display: inline-block;
                ">
                  <span style="color: #7c3aed; font-weight: 600; font-size: 14px;">Secure Authentication Required</span>
                </div>
              </div>
            </div>

            <!-- Welcome Message -->
            <div style="padding: 50px 40px 40px; text-align: center;">
              <div style="margin-bottom: 30px;">
                <h2 style="color: #1e1b4b; font-size: 20px; margin: 0 0 10px;">Welcome to Our Medical Community</h2>
                <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">
                  Thank you for joining PrimeCare. As part of our commitment to maintaining the highest medical standards, 
                  we require verification of all healthcare professionals.
                </p>
              </div>

              <!-- OTP Section -->
              <div style="
                background: linear-gradient(to right, rgba(124, 58, 237, 0.05), rgba(91, 33, 182, 0.05));
                border-radius: 16px;
                padding: 30px;
                margin: 30px 0;
                border: 1px dashed rgba(124, 58, 237, 0.3);
              ">
                <p style="color: #5b21b6; font-size: 14px; margin: 0 0 15px; font-weight: 500;">Your Verification Code</p>
                <div style="
                  background: linear-gradient(135deg, #7c3aed, #5b21b6);
                  display: inline-block;
                  padding: 15px 40px;
                  border-radius: 12px;
                  position: relative;
                  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.25);
                ">
                  <span style="
                    color: white;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: 6px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  ">${otp}</span>
                </div>
                <p style="color: #64748b; font-size: 13px; margin: 15px 0 0;">
                  Valid for 5 minutes only
                </p>
              </div>

              <!-- Security Notice -->
              <div style="
                background: #fffbeb;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                text-align: left;
                border-radius: 8px;
                margin: 20px 0;
              ">
                <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
                  <strong>Security Notice:</strong> Never share this code with anyone. 
                  PrimeCare staff will never ask for your verification code.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            ">
              <div style="margin-bottom: 15px;">
                <img src="https://res.cloudinary.com/dux2ya5rb/image/upload/v1742984485/logo-icon1_fo7rad.png" alt="PrimeCare Logo" style="height: 30px; width: auto;">
                <div style="color: #64748b; font-size: 13px;">
                  Trusted Healthcare Platform
                </div>
              </div>
              <div style="color: #94a3b8; font-size: 12px;">
                © 2024 PrimeCare Medical Services. All rights reserved.<br>
                <a href="#" style="color: #7c3aed; text-decoration: none;">Privacy Policy</a> • 
                <a href="#" style="color: #7c3aed; text-decoration: none;">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);

    return otp; // Return the OTP for testing purposes.
  }

  async verifyOTP(email, otp) {
    console.log("Email in verifyOTP:", email, typeof email); // Debugging

    if (typeof email !== "string") {
      throw new Error("Invalid email format. Expected a string.");
    }

    const record = await OTP.findOne({ email });
    console.log("Record in verifyOTP:", record);

    if (record && record.otp === otp) {
      await OTP.deleteOne({ email });
      return true;
    }
    return false;
  }
}

export default new OTPService();
