const requireRole = (requiredRole) => {
  return (req, res, next) => {
    // Make sure authentication ran before role authorization
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required.'
      });
    }

    // Check whether the authenticated user has the required role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: 'Forbidden.'
      });
    }

    // User has the required role
    next();
  };
};

module.exports = requireRole;