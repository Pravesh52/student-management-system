export const validateStudent = (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
    return res.status(400).json({ success: false, message: "First name, last name and email are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Enter a valid student email." });
  }
  next();
};
