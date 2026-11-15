export const validateAdminRegistration = (req, res, next) => {
  const { name, email, password, setupKey } = req.body;
  if (!name || !email || !password || !setupKey) {
    return res.status(400).json({ success: false, message: "Name, email, password and setupKey are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Enter a valid email address." });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must contain at least 8 characters." });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }
  next();
};
