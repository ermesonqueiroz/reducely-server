import { CreateLinkController } from '../../adapters/presentation/controllers/create-link';
import { PostgresLinksRepository } from '../../external/repositories/postgres/postgres-links-repository';
import { CreateLink } from '../../usecases/create-link';

export function makeCreateLinkController(): CreateLinkController {
  const postgresLinksRepository = new PostgresLinksRepository();
  const createLink = new CreateLink(postgresLinksRepository);
  const createLinkController = new CreateLinkController(createLink);
  return createLinkController;
}