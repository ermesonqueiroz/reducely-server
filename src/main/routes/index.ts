import { Router } from 'express';
import apiRoutes from './api';
import redirectRoutes from './redirect';

const router = Router();

router.use('/api', apiRoutes);
router.use('/r', redirectRoutes);

export default router;
