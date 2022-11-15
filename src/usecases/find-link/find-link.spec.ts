import { FindLink } from '.';
import { LinkData } from '../../entities/link/link-data';
import { InMemoryLinkRepository } from '../../repositories/in-memory/in-memory-links-repository';

describe('Find link use case', () => {
  it('should be find link with existent id', async () => {
    const link: LinkData = {
      id: 'UgGVwnxF',
      target: 'https://github.com/ermesonqueiroz',
      createdAt: new Date(),
      accessCount: 0
    };
    const links: LinkData[] = [link];
    const repo = new InMemoryLinkRepository(links);
    const sut = new FindLink(repo);
    const response = await sut.execute({ id: link.id });

    expect(response.isRight()).toBeTruthy();
  });

  it('should not be find link with nonexistent id', async () => {
    const links: LinkData[] = [];
    const repo = new InMemoryLinkRepository(links);
    const sut = new FindLink(repo);
    const response = await sut.execute({ id: 'UgGVwnxF' });

    expect(response.isLeft()).toBeTruthy();
  });

  it('should not be find link with nonexistent id (only blank spaces)', async () => {
    const link: LinkData = {
      id: 'UgGVwnxF',
      target: 'https://github.com/ermesonqueiroz',
      createdAt: new Date(),
      accessCount: 0
    };
    const links: LinkData[] = [link];
    const repo = new InMemoryLinkRepository(links);
    const sut = new FindLink(repo);
    const response = await sut.execute({ id: '    ' });

    expect(response.isLeft()).toBeTruthy();
  });
});
