export interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

export interface TypingStatus {
  user: string;
  isTyping: boolean;
}

export interface ChatContextType {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  isConnected: boolean;
  userTyping: TypingStatus | null;
  setUsername: (username: string) => void;
  sendMessage: (text: string) => void;
  setTyping: (isTyping: boolean) => void;
} 