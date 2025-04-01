import dotenv from "dotenv";
dotenv.config();


const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: "10d",
};

export default jwtConfig;