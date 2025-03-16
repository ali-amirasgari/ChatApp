import { Request, Response } from 'express';
import { store } from '../models/store';

export const getChatStatus = (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'active',
    users: store.getUsers().length,
    messages: store.getMessages().length
  });
};

export const getMessages = (req: Request, res: Response): void => {
  res.status(200).json({
    messages: store.getMessages()
  });
};

export const getUsers = (req: Request, res: Response): void => {
  res.status(200).json({
    users: store.getUsers()
  });
}; 