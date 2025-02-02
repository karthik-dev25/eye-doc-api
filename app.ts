import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default app;