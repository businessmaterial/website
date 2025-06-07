const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { verifyToken, checkRole } = require('../middleware/auth.middleware');
const examController = require('../controllers/exam.controller');
const validate = require('../middleware/validate.middleware');

// Get all exam categories
router.get('/categories', examController.getCategories);

// Get exams by category
router.get(
  '/category/:categoryId',
  [
    param('categoryId').isMongoId().withMessage('Invalid category ID'),
    validate,
  ],
  examController.getExamsByCategory
);

// Get exam details
router.get(
  '/:examId',
  [
    param('examId').isMongoId().withMessage('Invalid exam ID'),
    validate,
  ],
  examController.getExamDetails
);

// Protected routes
router.use(verifyToken);

// Get exam topics
router.get(
  '/:examId/topics',
  [
    param('examId').isMongoId().withMessage('Invalid exam ID'),
    validate,
  ],
  examController.getExamTopics
);

// Get exam sections
router.get(
  '/:examId/sections',
  [
    param('examId').isMongoId().withMessage('Invalid exam ID'),
    validate,
  ],
  examController.getExamSections
);

// Admin routes
router.use(checkRole(['admin']));

// Create new exam
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Exam name is required'),
    body('categoryId').isMongoId().withMessage('Invalid category ID'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
    validate,
  ],
  examController.createExam
);

// Update exam
router.put(
  '/:examId',
  [
    param('examId').isMongoId().withMessage('Invalid exam ID'),
    body('name').optional().trim().notEmpty().withMessage('Exam name cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
    validate,
  ],
  examController.updateExam
);

// Delete exam
router.delete(
  '/:examId',
  [
    param('examId').isMongoId().withMessage('Invalid exam ID'),
    validate,
  ],
  examController.deleteExam
);

module.exports = router; 