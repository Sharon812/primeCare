import mongoose from "mongoose";

const ClinicSchema = mongoose.Schema({
  ClinicName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfEstablishment: { type: Date, required: true },
});

const clinicModel = mongoose.model("Clinic", ClinicSchema);
export default clinicModel;
