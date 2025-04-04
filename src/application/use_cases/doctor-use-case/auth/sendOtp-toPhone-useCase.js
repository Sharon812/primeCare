class SendOtpToPhoneNumberUseCase {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }

  async execute(phoneNumber, recaptcha) {
    return await this.firebaseService
      .SendOtpToPhoneNumber(phoneNumber, recaptcha)
      .then((confirmationResult) => {
        console.log("OTP sent successfully:", confirmationResult);
        return confirmationResult;
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        throw error;
      });
  }
}

export default SendOtpToPhoneNumberUseCase;
