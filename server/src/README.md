# Chat App Server Structure

This is a structured backend for a real-time chat application using Express, Socket.io, and TypeScript.

## Directory Structure

```
src/
├── config/             # Configuration files and environment variables
├── controllers/        # Request handlers for routes
├── middleware/         # Express middleware
├── models/             # Data models and store
├── routes/             # Express routes
├── services/           # Business logic
├── socket/             # Socket.io event handlers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── app.ts              # Express application setup
└── index.ts            # Entry point
```

## Key Components

- **config/**: Central place for all configuration variables
- **controllers/**: Handle HTTP requests and responses (can be expanded for more complex APIs)
- **middleware/**: Express middleware for logging, authentication, etc.
- **models/**: Data structure definitions and memory store (can be replaced with database models)
- **routes/**: Express route definitions
- **services/**: Business logic that can be reused across routes and sockets
- **socket/**: Socket.io event handlers for real-time communication
- **types/**: TypeScript interfaces and types
- **utils/**: Helper functions
- **app.ts**: Express app setup with middleware and routes
- **index.ts**: Server entry point that connects Express and Socket.io

## Getting Started

1. Install dependencies: `npm install`
2. Start the server: `npm run dev`
3. Build for production: `npm run build`
4. Run production build: `npm start` 