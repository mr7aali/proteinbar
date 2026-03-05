import { Router } from 'express';
import * as locationController from './controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/', authenticate, locationController.createLocation);
router.put('/:id', authenticate, locationController.updateLocation);
router.delete('/:id', authenticate, locationController.deleteLocation);

export default router;
