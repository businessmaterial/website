const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const firebaseService = require('../services/firebase.service');

// Get available mock tests for an exam
router.get('/:examId', auth, async (req, res, next) => {
  try {
    const { examId } = req.params;
    const mockTests = await firebaseService.getMockTests(examId);
    res.json({ mockTests });
  } catch (error) {
    next(error);
  }
});

// Save mock test results
router.post('/results', auth, async (req, res, next) => {
  try {
    const performanceData = {
      ...req.body,
      userId: req.user.uid,
      type: 'mock_test'
    };
    const result = await firebaseService.saveUserPerformance(req.user.uid, performanceData);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 