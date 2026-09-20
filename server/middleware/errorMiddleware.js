// Centralized error handler — always returns clean JSON, never exposes internal errors
const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} — ${err.message}`);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages[0] });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({ success: false, message: 'Resource not found.' });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'A donor with this information already exists.' });
  }

  // Default internal server error — do not leak details
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred. Please try again.',
  });
};

module.exports = errorMiddleware;
