import Student from "../models/Student.js";
import Course from "../models/Course.js";

export const getDashboardStats = async (_req, res, next) => {
  try {
    const [
      totalStudents, activeStudents, inactiveStudents, totalCourses,
      recentlyAdded, studentsByCourse
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: "Active" }),
      Student.countDocuments({ status: "Inactive" }),
      Course.countDocuments(),
      Student.find().populate("course", "name code").sort({ createdAt: -1 }).limit(5),
      Student.aggregate([
        { $group: { _id: "$course", count: { $sum: 1 } } },
        { $lookup: {
          from: "courses", localField: "_id", foreignField: "_id", as: "courseInfo"
        }},
        { $unwind: { path: "$courseInfo", preserveNullAndEmptyArrays: true } },
        { $project: { courseName: { $ifNull: ["$courseInfo.name", "Unassigned"] }, count: 1 } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      success: true,
      stats: { totalStudents, activeStudents, inactiveStudents, totalCourses },
      recentlyAdded,
      studentsByCourse
    });
  } catch (error) { next(error); }
};
