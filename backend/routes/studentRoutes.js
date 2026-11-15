import express from "express";
import {
  createStudent, getStudents, getStudentById, updateStudent, deleteStudent
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadStudentPhoto } from "../middleware/uploadMiddleware.js";
import { validateStudent } from "../validators/studentValidator.js";

const router = express.Router();
router.use(protect);

router.route("/")
  .post(uploadStudentPhoto, validateStudent, createStudent)
  .get(getStudents);

router.route("/:id")
  .get(getStudentById)
  .put(uploadStudentPhoto, updateStudent)
  .delete(deleteStudent);

export default router;
