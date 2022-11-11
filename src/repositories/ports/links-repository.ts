import { LinkData } from '../../entities/link/link-data';

export interface LinksRepository {
  add(link: LinkData): Promise<void>;
  findLinkById(id: string): Promise<LinkData | null>;
  exists(id: string): Promise<boolean>;
}
