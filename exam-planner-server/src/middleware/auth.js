const admin = require('../config/firebase-admin');
const { logger } = require('../utils/logger');

const auth = async (req, res, next) => {
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
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { auth }; 