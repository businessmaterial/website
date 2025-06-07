const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const firebaseService = require('../services/firebase.service');

// Register new user
router.post('/register', async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await firebaseService.createUser(userData);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

// Get user profile
router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await firebaseService.getUser(req.user.uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/profile', auth, async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await firebaseService.updateUser(req.user.uid, updates);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 