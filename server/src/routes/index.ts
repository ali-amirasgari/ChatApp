import { Router } from 'express';
import { getChatStatus, getMessages, getUsers } from '../controllers/chatController';

const router = Router();

// Base route
router.get('/', (req, res) => {
  res.send('Chat API is Running');
});

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Chat routes
router.get('/status', getChatStatus);
router.get('/messages', getMessages);
router.get('/users', getUsers);

export const routes = router; 