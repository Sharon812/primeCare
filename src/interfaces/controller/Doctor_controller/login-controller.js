class DoctorLoginController {
  constructor() {}

  loginPageRender = async (req, res) => {
    try {
      console.log("Doctor login page route hit");
      res.render("doctor-login");
    } catch (error) {
      console.error("loginPageRender Controller Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}

export const doctorLoginController = new DoctorLoginController();
