import { User } from '../models/user';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authorization';
import { tokenService } from '../services/token.service';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const userData: Pick<User, 'id' | 'username'> =
      tokenService.validate(token);

    if (!userData) {
      return res.status(401).json({ message: 'Access denied' });
    }

    req.user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
