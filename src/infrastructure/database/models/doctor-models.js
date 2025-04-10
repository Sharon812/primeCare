import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  isStepOneFormCompleted: { type: Boolean, default: false },
  isStepTwoFormCompleted: { type: Boolean, default: false },
  isStepThreeFormCompleted: { type: Boolean, default: false },
  isFormCompleted: { type: Boolean, default: false },
  isAdminVerified: { type: Boolean, default: false },

  firstName: { type: String },
  lastName: { type: String },
  dob: { type: Date },
  age: { type: Number },
  country: { type: String },
  state: { type: String },
  district: { type: String },
  locality: { type: String },
  pincode: { type: Number },
  address: { type: String },
  idproof: { type: String },
  idType: { type: String },
  profileimage: { type: String },

  qualification: { type: String },
  specialization: { type: String },
  university: { type: String },
  graduationYear: { type: Number },
  studyCountry: { type: String },
  certification: { type: String },

  yearsOfExperience: { type: Number },
  experience: { type: String },
  previousHospital: { type: String },

  consultationFee: { type: Number },
  adminFee: { type: Number },
  doctorEarnings: { type: Number },
  termsAccepted: { type: Boolean },
  privacyAccepted: { type: Boolean },
});

const doctorModal = mongoose.model("Doctor", DoctorSchema);

export default doctorModal;
