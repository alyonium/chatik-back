import { User } from '../models/user';
import { Token } from '../models/token';

export type UserWithToken = User & { token: Token };
