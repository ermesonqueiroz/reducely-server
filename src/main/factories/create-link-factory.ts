import { CreateLinkController } from '../../adapters/presentation/controllers/create-link';
import { MongoLinksRepository } from '../../external/repositories/mongo/mongo-links-repository';
import { CreateLink } from '../../usecases/create-link';

export function makeCreateLinkController(): CreateLinkController {
  const mongoLinksRepository = new MongoLinksRepository();
  const createLink = new CreateLink(mongoLinksRepository);
  const createLinkController = new CreateLinkController(createLink);
  return createLinkController;
}