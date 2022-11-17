import { left, right } from '../../common/either';
import { LinksRepository } from '../../repositories/ports/links-repository';
import { CannotFindLinkError } from '../errors/cannot-find-link-error';
import { IncreaseLinkAccessCountRequest } from './increase-link-access-count-request';
import { IncreaseLinkAccessCountResponse } from './increase-link-access-count-response';

export class IncreaseLinkAccessCount {
  constructor(private readonly linksRepository: LinksRepository) {}
  
  public async execute({ linkId }: IncreaseLinkAccessCountRequest): Promise<IncreaseLinkAccessCountResponse> {
    const link = await this.linksRepository.findLinkById(linkId);
    if (!link) return left(new CannotFindLinkError(linkId));

    const updatedLink = { ...link, accessCount: link.accessCount + 1 };
    await this.linksRepository.update(linkId, updatedLink);

    return right(updatedLink);
  }
}
