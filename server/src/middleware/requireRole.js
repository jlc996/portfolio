const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Make sure authentication ran first
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Check whether the user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied.'
      });
    }

    next();
  };
};

module.exports = requireRole;