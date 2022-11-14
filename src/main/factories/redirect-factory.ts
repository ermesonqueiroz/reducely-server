import { RedirectController } from '../../adapters/presentation/controllers/redirect';
import { PostgresLinksRepository } from '../../external/repositories/postgres/postgres-links-repository';
import { FindLink } from '../../usecases/find-link';

export function makeRedirectController() {
  const postgresLinksRepository = new PostgresLinksRepository();
  const findLink = new FindLink(postgresLinksRepository);
  const redirectController = new RedirectController(findLink);
  return redirectController;
}
