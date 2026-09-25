const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Duplicate MongoDB key
  if (err.code === 11000) {
    return res.status(409).json({
      message: 'A resource with that value already exists.'
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed.'
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid resource identifier.'
    });
  }

  res.status(500).json({
    message: 'Internal server error.'
  });
};

module.exports = errorHandler;