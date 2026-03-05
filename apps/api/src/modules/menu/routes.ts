import { Router } from 'express';
import * as menuController from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

// Menu Items
router.get('/items', menuController.getAllMenuItems);
router.get('/items/:id', menuController.getMenuItemById);
router.post('/items', authenticate, menuController.createMenuItem);
router.put('/items/:id', authenticate, menuController.updateMenuItem);
router.delete('/items/:id', authenticate, menuController.deleteMenuItem);

// Categories
router.get('/categories', menuController.getAllCategories);
router.get('/categories/:id', menuController.getCategoryById);
router.post('/categories', authenticate, menuController.createCategory);
router.put('/categories/:id', authenticate, menuController.updateCategory);
router.delete('/categories/:id', authenticate, menuController.deleteCategory);

export default router;
