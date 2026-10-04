
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Allow public requests without a token.
  if (!authHeader) {
    return next();
  }

  // If a token is provided, it must use Bearer format.
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication required.'
    });
  }

  try {
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.sub);

    if (
      !user ||
      !user.isActive ||
      user.tokenVersion !== decoded.tokenVersion
    ) {
      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication required.'
    });
  }
};

module.exports = optionalAuth;