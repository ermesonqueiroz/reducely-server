import { LinkData } from '../../entities/link/link-data';
import { LinksRepository } from '../ports/links-repository';

export class InMemoryLinkRepository implements LinksRepository {
  constructor(private readonly links: LinkData[]) {}

  public async findLinkById(id: string): Promise<LinkData | null> {
    const link = this.links.find((link) => link.id === id);
    if (!link) return null;

    return link;
  }

  public async exists(id: string): Promise<boolean> {
    if (!await this.findLinkById(id)) return false;
    return true;
  }

  public async add(link: LinkData): Promise<void> {
    const exists = await this.exists(link.id);
    if (exists) return;

    this.links.push(link);
  }
}
