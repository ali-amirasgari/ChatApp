import { Server, Socket } from 'socket.io';
import { store } from '../models/store';
import { Message, User } from '../types';

export const setupSocketHandlers = (io: Server): void => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join chat
    socket.on('join', (username: string) => {
      const user: User = {
        id: socket.id,
        username
      };
      
      store.addUser(user);
      
      // Notify everyone about the new user
      io.emit('userJoined', user);
      
      // Send existing users and messages to the new user
      socket.emit('initialData', {
        users: store.getUsers(),
        messages: store.getMessages()
      });
      
      console.log(`${username} joined the chat`);
    });

    // Listen for messages
    socket.on('sendMessage', (messageText: string) => {
      const user = store.findUserById(socket.id);
      
      if (user) {
        const message: Message = {
          id: Date.now().toString(),
          user: user.username,
          text: messageText,
          timestamp: new Date()
        };
        
        store.addMessage(message);
        
        // Broadcast the message to all connected clients
        io.emit('newMessage', message);
        
        console.log(`Message from ${user.username}: ${messageText}`);
      }
    });

    // Handle typing status
    socket.on('typing', (isTyping: boolean) => {
      const user = store.findUserById(socket.id);
      if (user) {
        socket.broadcast.emit('userTyping', {
          user: user.username,
          isTyping
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const user = store.removeUser(socket.id);
      
      if (user) {
        // Notify everyone that the user left
        io.emit('userLeft', user);
        
        console.log(`${user.username} left the chat`);
      }
    });
  });
}; 