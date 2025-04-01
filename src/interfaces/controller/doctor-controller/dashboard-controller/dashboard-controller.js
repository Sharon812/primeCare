class DoctorDashboardController {
  constructor() {}

  doctorDashboardRender = async (req, res, next) => {
    try {
      res.render("doctor-dashboard");
    } catch (error) {
      console.log("Error in doctorDashboardRenderController", error);
      next(error);
    }
  }
}

export const doctorDashboardController = new DoctorDashboardController();