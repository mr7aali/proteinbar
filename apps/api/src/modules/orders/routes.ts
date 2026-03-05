import { Router } from 'express';
import * as orderController from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', orderController.getAllOrders);
router.get('/my-orders', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.patch('/:id/status', orderController.updateOrderStatus);

export default router;
