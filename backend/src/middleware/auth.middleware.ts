import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { AuthError } from '../utils/errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AuthError('Authentication token required');
    }

    const decoded = jwt.verify(token, config.jwtSecret!);
    req.user = decoded as { id: string; email: string };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AuthError('Invalid token'));
    } else {
      next(error);
    }
  }
}; 