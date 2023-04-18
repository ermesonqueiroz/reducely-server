import * as dotenv from 'dotenv';
import { MongoHelper } from '../external/repositories/mongo/helpers/mongo-helper';

dotenv.config();

MongoHelper.connect(process.env.DATABASE_URL as string)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));
  })
  .catch(console.error);
