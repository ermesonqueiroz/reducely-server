import { PostgresHelper } from '../external/repositories/postgres/helpers/postgres-helper';

PostgresHelper.connect('postgres://user:passwd@localhost:54322/url_shortener')
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));
  })
  .catch(console.error);
