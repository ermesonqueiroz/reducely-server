import { left, right } from '../../common/either';
import { Link } from '../../entities/link/link';
import { LinksRepository } from '../../repositories/ports/links-repository';
import { CreateLinkRequest } from './create-link-request';
import { CreateLinkResponse } from './create-link-response';

export class CreateLink {
  constructor(private readonly linksRepository: LinksRepository) {}

  public async execute(request: CreateLinkRequest): Promise<CreateLinkResponse> {
    const linkOrError = Link.create(request);
    if(linkOrError.isLeft()) return left(linkOrError.value);

    const link = linkOrError.value;

    if(!(await this.linksRepository.exists(link.id.value)))
      await this.linksRepository.add({
        id: link.id.value,
        target: link.target.value,
        accessCount: link.accessCount,
        createdAt: link.createdAt,
      });

    return right({
      id: link.id.value,
      target: link.target.value,
      accessCount: link.accessCount,
      createdAt: link.createdAt,
    });
  }
}
