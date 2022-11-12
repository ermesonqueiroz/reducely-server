import { Express, Router } from 'express';
import v1 from '../routes/v1';

export default (app: Express) => {
  const router = Router();
  router.use('/', v1);
  app.use('/api', router);
};
