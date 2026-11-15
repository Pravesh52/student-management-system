import Course from "../models/Course.js";
import Student from "../models/Student.js";

export const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, message: "Course created.", course });
  } catch (error) { next(error); }
};

export const getCourses = async (_req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ success: true, courses });
  } catch (error) { next(error); }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.json({ success: true, course });
  } catch (error) { next(error); }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.json({ success: true, message: "Course updated.", course });
  } catch (error) { next(error); }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const assignedCount = await Student.countDocuments({ course: req.params.id });
    if (assignedCount > 0) {
      return res.status(409).json({
        success: false,
        message: `This course is assigned to ${assignedCount} student(s). Reassign them before deleting.`
      });
    }
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.json({ success: true, message: "Course deleted." });
  } catch (error) { next(error); }
};

export const getCourseStudents = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    const students = await Student.find({ course: course._id }).sort({ firstName: 1 });
    res.json({ success: true, students });
  } catch (error) { next(error); }
};
