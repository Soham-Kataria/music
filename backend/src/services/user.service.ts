import User, { IUser } from '../models/user.model.js';
import { AppError } from '../middlewares/errorHandler.js';

export class UserService {
  private static readonly ALLOWED_UPDATES = ['username', 'email', 'avatar', 'bio', 'location'];

  static async updateUser(id: string, updates: Partial<IUser>): Promise<IUser> {
    if (updates.password) {
      throw new AppError('Password cannot be updated here', 400);
    }

    const filteredUpdates: any = {};
    for (const key of this.ALLOWED_UPDATES) {
      if ((updates as any)[key] !== undefined) {
        filteredUpdates[key] = (updates as any)[key];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      throw new AppError('No valid fields provided for update', 400);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    return updatedUser;
  }

  static async deleteUser(id: string): Promise<void> {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new AppError('User not found', 404);
    }
  }

  static async getUserById(id: string): Promise<IUser | null> {
    return (await User.findById(id).select('-password')) as IUser | null;
  }
}
