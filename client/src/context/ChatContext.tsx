import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { User, Message, TypingStatus, ChatContextType } from '../types';

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  users: [],
  currentUser: null,
  isConnected: false,
  userTyping: null,
  setUsername: () => {},
  sendMessage: () => {},
  setTyping: () => {},
});

// Define props for ChatProvider
interface ChatProviderProps {
  children: ReactNode;
}

// Socket.io server URL
const SOCKET_URL = 'http://172.20.8.93:5000';

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Socket connection
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  
  // Message state
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Typing state
  const [userTyping, setUserTyping] = useState<TypingStatus | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setSocket(newSocket);
    });
    
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });
    
    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;
    
    // Handle initial data from server
    socket.on('initialData', (data: { users: User[], messages: Message[] }) => {
      setUsers(data.users);
      setMessages(data.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    });
    
    // Handle new user joined
    socket.on('userJoined', (user: User) => {
      setUsers(prevUsers => [...prevUsers, user]);
    });
    
    // Handle user left
    socket.on('userLeft', (user: User) => {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
    });
    
    // Handle new message
    socket.on('newMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, {
        ...message,
        timestamp: new Date(message.timestamp)
      }]);
    });
    
    // Handle typing status
    socket.on('userTyping', (status: TypingStatus) => {
      if (status.isTyping) {
        setUserTyping(status);
      } else {
        setUserTyping(prev => prev?.user === status.user ? null : prev);
      }
    });
    
    // Clean up event listeners
    return () => {
      socket.off('initialData');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('newMessage');
      socket.off('userTyping');
    };
  }, [socket]);

  // Join chat with username
  const setUsername = (username: string) => {
    if (!socket || !username.trim()) return;
    
    socket.emit('join', username);
    
    // Make sure socket.id is available
    if (socket.id) {
      setCurrentUser({
        id: socket.id,
        username
      });
    }
  };

  // Send message
  const sendMessage = (text: string) => {
    if (!socket || !text.trim() || !currentUser) return;
    
    socket.emit('sendMessage', text);
  };

  // Set typing status
  const setTyping = (isTyping: boolean) => {
    if (!socket || !currentUser) return;
    
    socket.emit('typing', isTyping);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        currentUser,
        isConnected,
        userTyping,
        setUsername,
        sendMessage,
        setTyping
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => useContext(ChatContext); 