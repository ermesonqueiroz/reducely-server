import { Express } from 'express';
import routes from '../routes';

export default (app: Express) => {
  app.use('/', routes);
};
