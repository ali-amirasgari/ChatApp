export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
}

export interface TypingStatus {
  user: string;
  isTyping: boolean;
}

export interface InitialData {
  users: User[];
  messages: Message[];
} 