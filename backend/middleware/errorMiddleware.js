export const notFound = (req, res, _next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ success: false, message: `${field} already exists.` });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(item => item.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid resource ID." });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error." : err.message
  });
};
