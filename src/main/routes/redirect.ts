import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeRedirectController } from '../factories/redirect-factory';

const router = Router();

router.get('/:id', adaptRoute(makeRedirectController()));

export default router;
