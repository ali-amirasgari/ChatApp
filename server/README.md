# Chat App Server

Backend for the real-time chat application built with Node.js, Express, and Socket.io.

## Features

- Real-time messaging with Socket.io
- User presence detection
- Typing indicators
- Message history

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production:
   ```
   npm run build
   npm start
   ```

## API Endpoints

- `GET /` - Server status check

## Socket Events

### Client to Server
- `join` - Join the chat with a username
- `sendMessage` - Send a new message
- `typing` - Indicate typing status

### Server to Client
- `userJoined` - New user joined notification
- `userLeft` - User left notification
- `newMessage` - New message notification
- `initialData` - Initial user list and message history
- `userTyping` - User typing status update 