import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import config from './config';
import { setupSocketHandlers } from './socket/socketHandler';

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST']
  }
});

// Set up socket handlers
setupSocketHandlers(io);

// Start server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.environment}`);
});