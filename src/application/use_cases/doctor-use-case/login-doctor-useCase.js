import AppError from "../../../utils/custom-error.js";
import jwt from "jsonwebtoken";
import jwtConfig from "../../../config/jwtConfig.js";

class DoctorLoginUseCase {
  constructor(findDoctorRepository, hashSerivce) {
    this.findDoctorRepository = findDoctorRepository;
    this.hashSerivce = hashSerivce;
  }

  async execute({ email, password }) {
    console.log("This is the data from the use case", email, password);
    if (!email || !password) {
      throw new AppError("Email and password are required for login.", 400);
    }

    const doctor = await this.findDoctorRepository.findDoctorByEmail(email);
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    const isPasswordValid = await this.hashSerivce.comparePassword(
      password,
      doctor.password
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    const token = jwt.sign(
      { doctorId: doctor._id, email: doctor.email },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    return { doctor, token };
  }
}

export default DoctorLoginUseCase;
