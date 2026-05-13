import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.js';
import { config } from '../config/env.js';
import { AuthTokenPayload, PublicUserDTO } from '../types/index.js';

export class AuthService {
  static async register(userData: Partial<IUser>): Promise<{ token: string; user: PublicUserDTO }> {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) throw new Error('Email already in use');

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) throw new Error('Username already taken');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...userData,
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
    });

    const token = this.generateToken(user);

    return { token, user: this.formatUser(user) };
  }

  static async login(email: string, password: string): Promise<{ token: string; user: PublicUserDTO }> {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = this.generateToken(user, '7d');

    return { token, user: this.formatUser(user) };
  }

  static generateToken(user: IUser, expiresIn: string = '1d'): string {
    const payload: AuthTokenPayload = { id: user._id.toString(), username: user.username };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: expiresIn as any });
  }

  static formatUser(user: IUser): PublicUserDTO {
    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      dateOfBirth: user.dateOfBirth,
      location: user.location,
    };
  }
}
