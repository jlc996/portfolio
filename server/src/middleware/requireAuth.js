const jwt = require('jsonwebtoken');

const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    console.log('\n--- requireAuth DEBUG ---');

    // Get the Authorization header
    const authHeader = req.headers.authorization;

    console.log('Authorization header exists:', !!authHeader);

    // Make sure the header uses the Bearer token format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('AUTH FAILED: Missing or invalid Authorization header');

      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Extract the JWT from the header
    const token = authHeader.split(' ')[1];

    console.log('Token exists:', !!token);

    // Verify the JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log('JWT verified successfully');
    console.log('Decoded token:', decoded);

    // Find the current user in the database
    const user = await User.findById(decoded.sub);

    console.log('User found:', !!user);

    // Make sure the user still exists and is active
    if (!user || !user.isActive) {
      console.log(
        'AUTH FAILED: User does not exist or is inactive'
      );

      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    console.log('User ID:', user._id);
    console.log('User active:', user.isActive);

    // Make sure the token has not been invalidated
    console.log('Database tokenVersion:', user.tokenVersion);
    console.log('JWT tokenVersion:', decoded.tokenVersion);

    if (user.tokenVersion !== decoded.tokenVersion) {
      console.log('AUTH FAILED: Token version mismatch');

      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Attach the authenticated user to the request
    req.user = user;

    console.log('AUTH SUCCESS: User authenticated');
    console.log('--- requireAuth DEBUG END ---\n');

    next();
  } catch (error) {
    console.log('AUTH FAILED: JWT error');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('--- requireAuth DEBUG END ---\n');

    // Invalid, expired, or malformed JWT
    return res.status(401).json({
      message: 'Authentication required.'
    });
  }
};

module.exports = requireAuth;
