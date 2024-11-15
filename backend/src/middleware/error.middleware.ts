import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errors';
import { config } from '../config/environment';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code
      }
    });
  }

  res.status(500).json({
    error: {
      message: config.nodeEnv === 'production' 
        ? 'Internal Server Error' 
        : err.message,
      code: 'INTERNAL_SERVER_ERROR'
    }
  });
}; 