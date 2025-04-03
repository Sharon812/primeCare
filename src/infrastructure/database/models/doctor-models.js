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
  



  highestQualification: { type: String },
  specialization: { type: String },
  medicalSchool: { type: String },
  graduationYear: { type: Number },
  countryOfStudy: { type: String },
  certificationPhoto: { type: String },

  yearsOfPractice: { type: Number },
  experienceCertificate: { type: String },
  previousHospital: { type: [String] },
  currentHospital: { type: String },

  originalConsultationFee: { type: Number },
  finalConsultationFee: { type: Number },
  availableDays: { type: [String] },
});

const doctorModal = mongoose.model("Doctor", DoctorSchema);

export default doctorModal;
