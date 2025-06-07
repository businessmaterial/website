const admin = require('../config/firebase-admin');
const { logger } = require('../utils/logger');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const { role } = req.user;
      if (!roles.includes(role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
      next();
    } catch (error) {
      logger.error('Role check error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = {
  verifyToken,
  checkRole,
}; 