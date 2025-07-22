import { Router } from 'express';
import { userController } from '../controllers/user.controller';

export const router = Router();

router.post('/register', userController.create);
router.post('/login', userController.login);
