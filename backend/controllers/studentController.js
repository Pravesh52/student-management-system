import fs from "fs";
import path from "path";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import generateEnrollment from "../utils/generateEnrollment.js";

const removePhoto = (photoPath) => {
  if (!photoPath) return;
  const absolutePath = path.resolve(photoPath.replace(/^\//, ""));
  fs.unlink(absolutePath, () => {});
};

export const createStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email, course } = req.body;
    if (course && !(await Course.exists({ _id: course }))) {
      return res.status(400).json({ success: false, message: "Selected course does not exist." });
    }

    const student = await Student.create({
      ...req.body,
      email: email.toLowerCase(),
      enrollmentNumber: await generateEnrollment(),
      profilePhoto: req.file ? `/uploads/${req.file.filename}` : ""
    });

    const populated = await student.populate("course", "name code");
    res.status(201).json({ success: true, message: "Student created.", student: populated });
  } catch (error) { next(error); }
};

export const getStudents = async (req, res, next) => {
  try {
    const {
      search = "", course = "", status = "", sortBy = "createdAt",
      order = "desc", page = 1, limit = 10
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (course) filter.course = course;
    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { firstName: regex }, { lastName: regex },
        { email: regex }, { enrollmentNumber: regex }
      ];
    }

    const allowedSortFields = ["firstName", "lastName", "createdAt", "enrollmentNumber"];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const safeOrder = order === "asc" ? 1 : -1;
    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const [students, total] = await Promise.all([
      Student.find(filter).populate("course", "name code")
        .sort({ [safeSortBy]: safeOrder })
        .skip((pageNumber - 1) * pageSize).limit(pageSize),
      Student.countDocuments(filter)
    ]);

    res.json({
      success: true, students,
      pagination: {
        total, page: pageNumber, limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) { next(error); }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate("course", "name code description");
    if (!student) return res.status(404).json({ success: false, message: "Student not found." });
    res.json({ success: true, student });
  } catch (error) { next(error); }
};

export const updateStudent = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.email) updates.email = updates.email.toLowerCase();
    if (updates.course && !(await Course.exists({ _id: updates.course }))) {
      return res.status(400).json({ success: false, message: "Selected course does not exist." });
    }

    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found." });

    if (req.file) {
      removePhoto(student.profilePhoto);
      updates.profilePhoto = `/uploads/${req.file.filename}`;
    }

    Object.assign(student, updates);
    await student.save();
    await student.populate("course", "name code");
    res.json({ success: true, message: "Student updated.", student });
  } catch (error) { next(error); }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found." });
    removePhoto(student.profilePhoto);
    await student.deleteOne();
    res.json({ success: true, message: "Student deleted." });
  } catch (error) { next(error); }
};
