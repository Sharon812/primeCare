class DoctorStepSecondFormController {
  constructor() {};

  stepTwoFormRender = async (req, res, next) => {
    try {
      console.log("Doctor step two form route hit");
      res.render("form-step2");
      
    } catch (error) {
      console.log("stepTwoFormRender Controller Error:", error);
      next(error);
    }
  }
}

export const doctorStepSecondFormController = new DoctorStepSecondFormController();