require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 