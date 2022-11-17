import { RedirectController } from '../../adapters/presentation/controllers/redirect';
import { PostgresLinksRepository } from '../../external/repositories/postgres/postgres-links-repository';
import { FindLink } from '../../usecases/find-link';
import { IncreaseLinkAccessCount } from '../../usecases/increase-link-acess-count';

export function makeRedirectController() {
  const postgresLinksRepository = new PostgresLinksRepository();
  const findLink = new FindLink(postgresLinksRepository);
  const increaseLinkAccessCount = new IncreaseLinkAccessCount(postgresLinksRepository);
  const redirectController = new RedirectController(findLink, increaseLinkAccessCount);
  return redirectController;
}
