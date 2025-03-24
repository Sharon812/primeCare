const loginPageRender = (req, res) => {
  try {
    console.log("Doctor login route hit");
    res.render("doctor-login");
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { loginPageRender };
