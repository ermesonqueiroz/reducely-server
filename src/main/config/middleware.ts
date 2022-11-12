import { Express } from 'express';
import { bodyParser, contentType, cors } from '../middleware';

export default (app: Express) => {
  app.use(bodyParser);
  app.use(contentType);
  app.use(cors);
};
