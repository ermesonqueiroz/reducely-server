import { left, right } from '../../common/either';
import { LinksRepository } from '../../repositories/ports/links-repository';
import { CannotFindLinkError } from '../errors/cannot-find-link-error';
import { FindLinkRequest } from './find-link-request';
import { FindLinkResponse } from './find-link-response';

export class FindLink {
  constructor(private readonly linksRepository: LinksRepository) {}

  public async execute({ id }: FindLinkRequest): Promise<FindLinkResponse> {
    const link = await this.linksRepository.findLinkById(id);
    
    if (!link) return left(new CannotFindLinkError(id));
    return right(link);
  }
}
