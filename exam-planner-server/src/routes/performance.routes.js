const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const firebaseService = require('../services/firebase.service');

// Get user performance for a specific exam
router.get('/:examId', auth, async (req, res, next) => {
  try {
    const { examId } = req.params;
    const performance = await firebaseService.getUserPerformance(req.user.uid, examId);
    res.json({ performance });
  } catch (error) {
    next(error);
  }
});

// Get overall user performance
router.get('/', auth, async (req, res, next) => {
  try {
    const performance = await firebaseService.getUserPerformance(req.user.uid);
    res.json({ performance });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 