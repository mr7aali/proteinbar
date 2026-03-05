import { Router } from 'express';
import productRoutes from '../modules/products/routes';
import orderRoutes from '../modules/orders/routes';
import userRoutes from '../modules/users/routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

export default router;
