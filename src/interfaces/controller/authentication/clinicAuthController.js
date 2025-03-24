import clinicRegisterUseCase from "../../../application/use_cases/clinic_useCase/clinicRegisterUseCase.js";

class userAuthController {
  constructor() {
    this.clinicRegisterUseCase = new clinicRegisterUseCase();
  }

  async renderStep1(req, res) {
    res.render("clinic_loginPage");
  }

  async handleRegisterStep1(req, res) {
    try {
      const {
        clinicName,
        date_of_establishment,
        email,
        phoneNumber,
        password,
      } = req.body;

      await this.clinicRegisterUseCase();
    } catch (error) {
      console.error(
        error,
        "error at clincauthcontroller.js in handling register step 1"
      );
    }
  }
}

export default new userAuthController();
