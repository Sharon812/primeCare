class DoctorResisterController {
  constructor() {}

  registerPageRender = async (req, res) => {
    try {
      console.log("Doctor register page route hit");
      res.render("doctor-register");
    } catch (error) {
      console.log("registerPageRender Controller Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}

export const doctorRegisterController = new DoctorResisterController();