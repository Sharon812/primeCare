import SendOtpToPhoneNumberUseCase from "../../../../application/use_cases/doctor-use-case/auth/sendOtp-toPhone-useCase.js";
import FirebaseService from "../../../../infrastructure/services/firebase-service.js";

class SendOtpToPhoneNumber {
  constructor(SendOtpToPhoneNumberUseCase) {
    this.SendOtpToPhoneNumberUseCase = SendOtpToPhoneNumberUseCase;
  }

  sendOtpPageRender = async (req, res, next) => {
    try {
      console.log("Doctor send OTP route hit");
      res.render("phone-otp", {
        process: {
          env: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID:
              process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
          },
        },
      });
    } catch (error) {
      console.error("sendOtpPageRender Controller Error:", error);
      next(error);
    }
  };

  sendOtp = async (req, res, next) => {
    try {
      const { phoneNumber } = req.body;
      console.log("Received phone number:", phoneNumber);

      if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
      }

      const recaptcha =
        this.SendOtpToPhoneNumberUseCase.firebaseSerivice.getRecaptchaVerifier(
          "recaptcha-container"
        );

      const confirmationResult = await this.SendOtpToPhoneNumberUseCase.execute(
        phoneNumber,
        recaptcha
      );
      console.log("OTP sent successfully:", confirmationResult);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("sendOtp Controller Error:", error);
      next(error);
    }
  };
}

const firebaseService = new FirebaseService();
const sendOtpToPhoneNumberUseCase = new SendOtpToPhoneNumberUseCase(
  firebaseService
);

export const sendOtpToPhoneNumber = new SendOtpToPhoneNumber(
  sendOtpToPhoneNumberUseCase
);
