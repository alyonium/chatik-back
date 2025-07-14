import { User } from '../models/user';
import { userDB } from '../db/user.sql';
import bcrypt from 'bcrypt';
import { tokenService } from './token.service';
import { Token } from '../models/token';
import { UserWithToken } from '../types/authorization';

const registration = async ({
  username,
  password,
}: Pick<User, 'username' | 'password'>): Promise<UserWithToken> => {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const isUsernameExist = await userDB.findByUsername({ username });

  if (isUsernameExist) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 3);
  const user = await userDB.create({ username, password: hashedPassword });
  const token = tokenService.generate({
    id: user.id,
    username: user.username,
  });

  return { ...user, token };
};

const login = async ({
  username,
  password,
}: Pick<User, 'username' | 'password'>): Promise<UserWithToken> => {
  const user = await userDB.findByUsername({ username });

  if (!user) {
    throw new Error('User does not exist');
  }

  const isPasswordsEqual = await bcrypt.compare(password, user.password);

  if (!isPasswordsEqual) {
    throw new Error('Passwords do not match');
  }

  const token = tokenService.generate({
    id: user.id,
    username: user.username,
  });

  return { ...user, token };
};

const find = async ({ id }: Pick<User, 'id'>): Promise<User> => {
  return await userDB.findById({ id });
};

export const userService = {
  registration,
  login,
  find,
};
