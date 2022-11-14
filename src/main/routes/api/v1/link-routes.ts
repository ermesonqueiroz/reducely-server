import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeCreateLinkController } from '../../../factories/create-link-factory';

const router = Router();

router.post('/', adaptRoute(makeCreateLinkController()));

export default router;
