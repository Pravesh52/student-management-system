import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  enrollmentNumber: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true, trim: true, maxlength: 60 },
  lastName: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true, default: "" },
  dateOfBirth: { type: Date, default: null },
  gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "" },
  address: { type: String, trim: true, default: "" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  profilePhoto: { type: String, default: "" }
}, { timestamps: true });

studentSchema.index({ firstName: 1, lastName: 1 });

export default mongoose.model("Student", studentSchema);
