import express from 'express';
import cors from 'cors';
import config from './config';
import { routes } from './routes';
import { loggerMiddleware } from './middleware/logger';

// Create Express app
const app = express();

// Middleware
app.use(loggerMiddleware);
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Routes
app.use('/api', routes);

export default app; 