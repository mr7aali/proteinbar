import { Router } from 'express';
import * as planController from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.get('/', planController.getAllPlans);
router.get('/:id', planController.getPlanById);
router.post('/', authenticate, planController.createPlan);
router.put('/:id', authenticate, planController.updatePlan);
router.delete('/:id', authenticate, planController.deletePlan);

export default router;
