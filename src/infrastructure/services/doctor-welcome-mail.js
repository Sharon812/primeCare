import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import Doctor from "../database/models/doctor-models.js";

class DoctorWelcomeEmail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendWelcomeEmail(doctorId) {
    try {
      const doctorDetails = await Doctor.findById(doctorId);
      const { email, firstName, lastName } = doctorDetails;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to PrimeCare - Your Journey Begins Here",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f6f9fc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="cid:logo" alt="PrimeCare Logo" style="width: 120px; height: auto;">
                </div>
                
                <h1 style="color: #1a237e; font-size: 24px; margin-bottom: 20px; text-align: center;">Welcome to PrimeCare, Dr. ${firstName} ${lastName}!</h1>
                
                <div style="border-left: 4px solid #1a237e; padding-left: 20px; margin: 30px 0;">
                  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                    Thank you for choosing PrimeCare! We've received your application and our admin team will verify your credentials within 3 working days.
                  </p>
                </div>

                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <h2 style="color: #1a237e; font-size: 18px; margin-bottom: 15px;">Next Steps:</h2>
                  <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.6; padding-left: 20px;">
                    <li>Our admin team will review your application</li>
                    <li>You'll receive a verification confirmation email</li>
                    <li>Once approved, you can access your dashboard</li>
                    <li>Set up your availability and start accepting appointments</li>
                  </ul>
                </div>

                <div style="background-color: #e3f2fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="color: #1a237e; font-size: 16px; line-height: 1.6; margin: 0;">
                    📎 We've attached a copy of your application for your records. Please keep this for future reference.
                  </p>
                </div>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; text-align: center;">
                    If you have any questions about your application status, please contact us at<br>
                    <a href="mailto:support@primecare.com" style="color: #1a237e; text-decoration: none;">support@primecare.com</a>
                  </p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                  <p style="color: #4a4a4a; font-size: 14px; margin: 5px 0;">Best Regards,</p>
                  <p style="color: #1a237e; font-size: 16px; font-weight: bold; margin: 5px 0;">The PrimeCare Team</p>
                </div>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <div style="display: inline-block; margin: 0 10px;">
                    <a href="https://facebook.com/primecare" style="text-decoration: none; color: #1a237e;">Facebook</a>
                  </div>
                  <div style="display: inline-block; margin: 0 10px;">
                    <a href="https://twitter.com/primecare" style="text-decoration: none; color: #1a237e;">Twitter</a>
                  </div>
                  <div style="display: inline-block; margin: 0 10px;">
                    <a href="https://linkedin.com/company/primecare" style="text-decoration: none; color: #1a237e;">LinkedIn</a>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        attachments: [
          {
            filename: "logo-icon1.png",
            path: "src/public/assets/logo-icon1.png",
            cid: "logo",
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully with PDF attachment!");
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  }
}

export default DoctorWelcomeEmail;
