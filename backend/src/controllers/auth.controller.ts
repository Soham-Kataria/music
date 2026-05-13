import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { UserService } from '../services/user.service.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { AppError } from '../middlewares/errorHandler.js';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  res.status(201).json(result);
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }
  const result = await AuthService.login(email, password);
  res.json(result);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }
  const user = await UserService.getUserById(req.user.id);
  res.json(user);
});
