import { User, Message } from '../types';

// In-memory data store (would be replaced with a database in production)
class Store {
  private users: User[] = [];
  private messages: Message[] = [];

  // User methods
  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  removeUser(userId: string): User | undefined {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      const user = this.users[index];
      this.users.splice(index, 1);
      return user;
    }
    return undefined;
  }

  findUserById(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  // Message methods
  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message): Message {
    this.messages.push(message);
    return message;
  }
}

// Singleton instance
export const store = new Store(); 