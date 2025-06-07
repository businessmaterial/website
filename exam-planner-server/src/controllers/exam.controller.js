const firebaseService = require('../services/firebase.service');
const { AppError } = require('../middleware/errorHandler');
const { logger } = require('../utils/logger');

const examController = {
  async getCategories(req, res, next) {
    try {
      const categories = await firebaseService.getExams();
      res.json({ categories });
    } catch (error) {
      logger.error('Error getting categories:', error);
      next(new AppError('Failed to fetch exam categories', 500));
    }
  },

  async getExamsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const exams = await firebaseService.getExams();
      const filteredExams = exams.filter(exam => exam.categoryId === categoryId);
      res.json({ exams: filteredExams });
    } catch (error) {
      logger.error('Error getting exams by category:', error);
      next(new AppError('Failed to fetch exams', 500));
    }
  },

  async getExamDetails(req, res, next) {
    try {
      const { examId } = req.params;
      const exam = await firebaseService.getExamById(examId);
      if (!exam) {
        return next(new AppError('Exam not found', 404));
      }
      res.json({ exam });
    } catch (error) {
      logger.error('Error getting exam details:', error);
      next(new AppError('Failed to fetch exam details', 500));
    }
  },

  async getExamTopics(req, res, next) {
    try {
      const { examId } = req.params;
      const topics = await firebaseService.getExamTopics(examId);
      res.json({ topics });
    } catch (error) {
      logger.error('Error getting exam topics:', error);
      next(new AppError('Failed to fetch exam topics', 500));
    }
  },

  async getExamSections(req, res, next) {
    try {
      const { examId } = req.params;
      const sections = await firebaseService.getExamSections(examId);
      res.json({ sections });
    } catch (error) {
      logger.error('Error getting exam sections:', error);
      next(new AppError('Failed to fetch exam sections', 500));
    }
  },

  async createExam(req, res, next) {
    try {
      const examData = req.body;
      const exam = await firebaseService.createExam(examData);
      res.status(201).json({ exam });
    } catch (error) {
      logger.error('Error creating exam:', error);
      next(new AppError('Failed to create exam', 500));
    }
  },

  async updateExam(req, res, next) {
    try {
      const { examId } = req.params;
      const updateData = req.body;
      const exam = await firebaseService.updateExam(examId, updateData);
      res.json({ exam });
    } catch (error) {
      logger.error('Error updating exam:', error);
      next(new AppError('Failed to update exam', 500));
    }
  },

  async deleteExam(req, res, next) {
    try {
      const { examId } = req.params;
      await firebaseService.deleteExam(examId);
      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting exam:', error);
      next(new AppError('Failed to delete exam', 500));
    }
  }
};

module.exports = examController; 