import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true, maxlength: 100 },
  code: { type: String, required: true, trim: true, uppercase: true, unique: true },
  description: { type: String, trim: true, maxlength: 1000, default: "" },
  duration: { type: String, trim: true, default: "" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
