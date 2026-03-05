import { Router } from 'express';
import * as userController from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);

export default router;
