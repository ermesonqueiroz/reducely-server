import { LinkData } from '../../../entities/link/link-data';
import { LinksRepository } from '../../../repositories/ports/links-repository';
import { Link } from './models/link';

export class MongoLinksRepository implements LinksRepository {
  async add({ id, ...link }: LinkData): Promise<void> { 
    if (await this.exists(id)) return;
    await Link.create({ ...link, code: id });
  }

  async exists(id: string): Promise<boolean> {
    const link = await Link.findOne({ code: id }).exec();
    return !!link;
  }

  async findLinkById(id: string): Promise<LinkData | null> {
    const link = await Link.findOne({ code: id }).exec();
    
    if (link)
      return {
        id: link.code!,
        target: link.target!,
        createdAt: link.createdAt!,
        accessCount: link.accessCount!
      };

    return null;
  }

  async update(id: string, data: LinkData): Promise<void> {
    await Link.findOneAndUpdate({ code: id }, { ...data });
  }
}
