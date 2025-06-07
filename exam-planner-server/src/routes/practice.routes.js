const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const firebaseService = require('../services/firebase.service');

// Get practice questions by exam and topic
router.get('/:examId/topics/:topicId', auth, async (req, res, next) => {
  try {
    const { examId, topicId } = req.params;
    const questions = await firebaseService.getPracticeQuestions(examId, topicId);
    res.json({ questions });
  } catch (error) {
    next(error);
  }
});

// Save practice session results
router.post('/results', auth, async (req, res, next) => {
  try {
    const performanceData = {
      ...req.body,
      userId: req.user.uid,
      type: 'practice'
    };
    const result = await firebaseService.saveUserPerformance(req.user.uid, performanceData);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 