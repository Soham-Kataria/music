import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { AppError } from '../middlewares/errorHandler.js';

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await UserService.updateUser(id, req.body);
  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await UserService.deleteUser(id);
  res.status(200).json({ message: 'User deleted successfully' });
});
