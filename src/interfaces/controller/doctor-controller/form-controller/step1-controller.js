class DoctorStepOneFormController {
  constructor() {}

  stepOneFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step one form route hit");
      res.render("form-step1");
    } catch (error) {
      console.log("stepOneFormRender Controller Error:", error);
      next(error);
    }
  };
}

export const doctorStepOneFormController = new DoctorStepOneFormController();