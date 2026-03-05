import { Router } from 'express';
import * as subscriptionController from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', subscriptionController.getAllSubscriptions);
router.get('/my-subscriptions', subscriptionController.getUserSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.post('/', subscriptionController.createSubscription);
router.put('/:id', subscriptionController.updateSubscription);
router.patch('/:id/status', subscriptionController.updateSubscriptionStatus);
router.delete('/:id', subscriptionController.deleteSubscription);

export default router;
