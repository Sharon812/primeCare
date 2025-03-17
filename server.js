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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to listen to server
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("server running");
});
