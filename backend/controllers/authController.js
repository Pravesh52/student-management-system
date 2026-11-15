import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || "1d"
});

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, setupKey } = req.body;

    if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ success: false, message: "Invalid admin setup key." });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: "Admin email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      token: createToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) { next(error); }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    res.json({
      success: true,
      message: "Login successful.",
      token: createToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) { next(error); }
};

export const getCurrentAdmin = (req, res) => {
  res.json({
    success: true,
    admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email, role: req.admin.role }
  });
};
