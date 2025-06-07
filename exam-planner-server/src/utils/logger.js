const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),
    // Write all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
    }),
  ],
});

// Create a stream object with a 'write' function that will be used by morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = {
  logger,
}; 