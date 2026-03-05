import { Router } from 'express';
import productRoutes from '../modules/products/routes';
import orderRoutes from '../modules/orders/routes';
import userRoutes from '../modules/users/routes';
import menuRoutes from '../modules/menu/routes';
import locationRoutes from '../modules/locations/routes';
import monthlyPlanRoutes from '../modules/monthly-plans/routes';
import subscriptionRoutes from '../modules/subscriptions/routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/menu', menuRoutes);
router.use('/locations', locationRoutes);
router.use('/monthly-plans', monthlyPlanRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;
