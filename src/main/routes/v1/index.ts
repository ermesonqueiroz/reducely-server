import { Router } from 'express';
import linkRoutes from './link-routes';

const router = Router();
router.use('/v1', linkRoutes);

export default router;
