import { Request } from 'express';
import { User } from '../models/user';
import { Token } from '../models/token';

export type UserWithToken = User & { token: Token };

export interface AuthRequest extends Request {
  user?: Pick<User, 'id' | 'username'>;
}
