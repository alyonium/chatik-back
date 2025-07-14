import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

export const router = Router();

router.post('/registration', userController.create);
router.post('/login', userController.login);
router.get('/user/:id', authMiddleware, userController.find);
