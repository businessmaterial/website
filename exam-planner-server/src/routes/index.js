const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const examRoutes = require('./exam.routes');
const practiceRoutes = require('./practice.routes');
const mockTestRoutes = require('./mockTest.routes');
const performanceRoutes = require('./performance.routes');

// Auth routes
router.use('/auth', authRoutes);

// Exam routes
router.use('/exams', examRoutes);

// Practice routes
router.use('/practice', practiceRoutes);

// Mock test routes
router.use('/mock-tests', mockTestRoutes);

// Performance routes
router.use('/performance', performanceRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = router; 