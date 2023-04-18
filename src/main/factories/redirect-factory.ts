import { RedirectController } from '../../adapters/presentation/controllers/redirect';
import { MongoLinksRepository } from '../../external/repositories/mongo/mongo-links-repository';
import { FindLink } from '../../usecases/find-link';
import { IncreaseLinkAccessCount } from '../../usecases/increase-link-access-count';

export function makeRedirectController() {
  const mongoLinksRepository = new MongoLinksRepository();
  const findLink = new FindLink(mongoLinksRepository);
  const increaseLinkAccessCount = new IncreaseLinkAccessCount(mongoLinksRepository);
  const redirectController = new RedirectController(findLink, increaseLinkAccessCount);
  return redirectController;
}
