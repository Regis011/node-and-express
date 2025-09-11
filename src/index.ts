import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { requestLogger, logger } from './utils/logger';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Add colorful request logging middleware
app.use(requestLogger);

app.use(express.json());

// Handle favicon.ico requests to prevent 404 errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Start the server regardless of MongoDB connection
app.listen(PORT, () => {
  logger.success(`Server running on port ${PORT}`);
});

// Connect to MongoDB (non-blocking)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      logger.success('Connected to MongoDB');
    })
    .catch((err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
      logger.warn('Server will continue running without database connection');
    });
} else {
  logger.warn('No MONGO_URI provided, skipping database connection');
}
