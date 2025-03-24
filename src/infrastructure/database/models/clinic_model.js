import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  dateOfEstablishment: { type: Date, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number },
  password: { type: String },
});

export default mongoose.model("Clinic", clinicSchema);
