require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/projects', projectRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'Portfolio API is running.'
  });
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();