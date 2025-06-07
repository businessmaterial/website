const admin = require('../config/firebase-admin');
const { logger } = require('../utils/logger');

const db = admin.firestore();

const firebaseService = {
  // User operations
  async createUser(userData) {
    try {
      const userRef = db.collection('users').doc(userData.uid);
      await userRef.set({
        ...userData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        role: 'user',
        subscription: 'free'
      });
      return await userRef.get();
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  },

  async getUser(uid) {
    try {
      const userDoc = await db.collection('users').doc(uid).get();
      return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
      logger.error('Error getting user:', error);
      throw error;
    }
  },

  // Exam operations
  async getExams() {
    try {
      const examsSnapshot = await db.collection('exams').get();
      return examsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      logger.error('Error getting exams:', error);
      throw error;
    }
  },

  async getExamById(examId) {
    try {
      const examDoc = await db.collection('exams').doc(examId).get();
      return examDoc.exists ? { id: examDoc.id, ...examDoc.data() } : null;
    } catch (error) {
      logger.error('Error getting exam:', error);
      throw error;
    }
  },

  // Mock test operations
  async getMockTests(examId) {
    try {
      const testsSnapshot = await db.collection('mockTests')
        .where('examId', '==', examId)
        .get();
      return testsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      logger.error('Error getting mock tests:', error);
      throw error;
    }
  },

  // Practice questions operations
  async getPracticeQuestions(examId, topicId) {
    try {
      const questionsSnapshot = await db.collection('questions')
        .where('examId', '==', examId)
        .where('topicId', '==', topicId)
        .get();
      return questionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      logger.error('Error getting practice questions:', error);
      throw error;
    }
  },

  // Performance tracking
  async saveUserPerformance(uid, performanceData) {
    try {
      const performanceRef = db.collection('performances').doc();
      await performanceRef.set({
        userId: uid,
        ...performanceData,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      return await performanceRef.get();
    } catch (error) {
      logger.error('Error saving performance:', error);
      throw error;
    }
  },

  async getUserPerformance(uid, examId) {
    try {
      const performanceSnapshot = await db.collection('performances')
        .where('userId', '==', uid)
        .where('examId', '==', examId)
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();
      return performanceSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      logger.error('Error getting user performance:', error);
      throw error;
    }
  }
};

module.exports = firebaseService; 