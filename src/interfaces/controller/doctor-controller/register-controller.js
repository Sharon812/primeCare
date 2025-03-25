class DoctorRegisterController {
  constructor(createDoctorUseService) {
    this.createDoctorUseService = createDoctorUseService;
  }

  // Doctor Register Page Render (GET Request)
  registerPageRender = async (req, res) => {
    try {
      console.log("Doctor register page route hit");
      res.render("doctor-register");
    } catch (error) {
      console.log("registerPageRender Controller Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  // Doctor Register (POST Request)
  registerDoctor = async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, phone, password } = req.body;
      const doctor = await this.createDoctorUseService.execute({
        name,
        email,
        phone,
        password,
      });

      res.status(201).json({
        message: "Doctor Registered Successfully",
        doctorId: doctor._id,
      });
    } catch (error) {
      console.log("registerDoctor Controller Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}

export const doctorRegisterController = new DoctorRegisterController();
