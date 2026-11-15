import express from "express";
import {
  createCourse, getCourses, getCourseById, updateCourse, deleteCourse, getCourseStudents
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.route("/")
  .post(createCourse)
  .get(getCourses);

router.get("/:id/students", getCourseStudents);
router.route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

export default router;
