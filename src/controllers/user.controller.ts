import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { authMiddleware } from '../middlewares/authMiddleware';

const create = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.registration({ username, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userService.login({ username, password });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

const find = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const user = await userService.find({ id: +id });
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(400).json({ error: 'User ID is required' });
  }
};

export const userController = {
  create,
  login,
  find,
};
