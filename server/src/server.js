require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/db');

const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

// Protect Mongoose queries from unsafe query selectors
mongoose.set('sanitizeFilter', true);

// Create the Express application
const app = express();

// Use the PORT from the environment, or 5000 during local development
const PORT = process.env.PORT || 5000;

// Helmet adds security-related HTTP headers to responses
// This should be loaded before the other middleware
app.use(helmet());

// Only allow requests from the frontend URL defined in .env
app.use(
  cors({
    origin: process.env.CLIENT_URL
  })
);

// Allow the server to receive JSON request bodies
app.use(express.json());

// Project API routes
// GET, POST, PATCH, and DELETE requests are handled here
app.use('/api/projects', projectRoutes);

// Authentication routes
// Handles user registration and login
app.use('/api/auth', authRoutes);

// Simple endpoint used to check whether the API is running
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'Portfolio API is running.'
  });
});

// Handle errors passed from controllers and middleware
app.use(errorHandler);

// Connect to MongoDB before starting the Express server
const startServer = async () => {
  await connectDB();

  // Start listening for incoming requests
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Start the application
startServer();