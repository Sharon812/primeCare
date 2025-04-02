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

  stepOneForm = async (req, res, next) => {
    try {
      console.log(req.body);
      res.json({
        
        message: "Form submitted successfully",
        data: req.body
      })
    } catch (error) {
      console.log("stepOneForm Controller Error:", error);
      next(error);
    }
  };
}

export const doctorStepOneFormController = new DoctorStepOneFormController();
