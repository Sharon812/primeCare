import mongoose from "mongoose";

const ClinicSchema = mongoose.Schema({
  ClinicName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfEstablishment: { type: Date, required: true },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneNumberVerified: { type: Boolean, default: false },
});

const clinicModel = mongoose.model("Clinic", ClinicSchema);
export default clinicModel;
