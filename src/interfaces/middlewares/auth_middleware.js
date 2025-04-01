import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwtConfig.js";

export const protectDoctorRoute = (req, res, next) => {
  const token = req.cookies?.doctorToken;

  if (!token) {
    return res.redirect("/doctor/login");
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.doctor = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error", error);
    return res.redirect("/doctor/login");
  }
};

export const preventLoggedDoctor = (req, res, next) => {
  const token = req.cookies?.doctorToken;

  if (token) {
    try {
      jwt.verify(token, jwtConfig.secret);
      return res.redirect("/doctor/dashboard");
    } catch (error) {
      next();
    }
  } else {
    next();
  }
};
