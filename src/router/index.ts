import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authorization';

export const router = Router();

router.post('/registration', userController.create);
router.post('/login', userController.login);
router.get('/user/:id', authMiddleware, userController.find);
router.connect('/chat', authMiddleware, (req, res) => {
  res.json({ user: (req as AuthRequest).user });
});
