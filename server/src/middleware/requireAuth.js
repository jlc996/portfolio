const jwt = require('jsonwebtoken');

const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Make sure the header uses the Bearer token format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Extract the JWT from the header
    const token = authHeader.split(' ')[1];

    // Verify the JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find the current user in the database
    const user = await User.findById(decoded.sub);

    // Make sure the user still exists and is active
    if (!user || !user.isActive) {
      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Make sure the token has not been invalidated
    if (user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Attach the authenticated user to the request
    req.user = user;

    next();
  } catch (error) {
    // Invalid, expired, or malformed JWT
    return res.status(401).json({
      message: 'Authentication required.'
    });
  }
};

module.exports = requireAuth;