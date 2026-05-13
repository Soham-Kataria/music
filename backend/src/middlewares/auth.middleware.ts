import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env.js';
import { AuthTokenPayload } from '../types/index.js';
import { asyncHandler } from './asyncHandler.js';

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          config.jwtSecret
        ) as AuthTokenPayload;

        req.user = { id: decoded.id };
        return next();
      } catch (err) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);
