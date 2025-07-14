import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Token } from '../models/token';

const generate = ({ id, username }: Pick<User, 'id' | 'username'>): Token => {
  return jwt.sign({ id, username }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '12h',
  });
};

const validate = (token: Token): Pick<User, 'id' | 'username'> => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as Pick<
    User,
    'id' | 'username'
  >;
};

export const tokenService = {
  generate,
  validate,
};
