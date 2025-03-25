//testing
import express from "express";
const app = express();
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();

//for connecting to mongodb database
import { connectDB } from "./src/infrastructure/database/connect_db.js";
connectDB();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//for no cache
app.use((req, res, next) => {
  res.set("cache-control", "no-store");
  next();
});

//for public folder
app.use(express.static(path.join(__dirname, "src", "public")));

//for ejs setup
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "src", "views/clinic"),
  path.join(__dirname, "src", "views/doctor"),
]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for clinic routes
// import clinicRoute from "./src/interfaces/routes/clinic_routes.js";
// app.use("/clinic", clinicRoute);

import { doctorRoute } from "./src/interfaces/routes/doctor-routes.js";
app.use("/doctor", doctorRoute);

//for error handling middleware
import errorHandler from "./src/interfaces/middlewares/error-handler.js";
app.use(errorHandler);

//to listen to server
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server running at port ${process.env.PORT}`);
});
