import { CreateLink } from '.';
import { LinkData } from '../../entities/link/link-data';
import { InMemoryLinkRepository } from '../../repositories/in-memory/in-memory-links-repository';

describe('Create link use case', () => {
  it('should create link with valid target', async () => {
    const target = 'https://github.com/ermesonqueiroz';
    const links: LinkData[] = [];
    const repo = new InMemoryLinkRepository(links);
    const sut = new CreateLink(repo);
    const response = await sut.execute({ target });
    
    expect(response.isRight()).toBeTruthy();
  });

  it('should not create link with invalid target', async () => {
    const target = 'github/ermesonqueiroz';
    const links: LinkData[] = [];
    const repo = new InMemoryLinkRepository(links);
    const sut = new CreateLink(repo);
    const error = await sut.execute({ target });
    
    expect(error.isLeft()).toBeTruthy();
  });

  it('should not create link with invalid target (only blank spaces)', async () => {
    const target = '     ';
    const links: LinkData[] = [];
    const repo = new InMemoryLinkRepository(links);
    const sut = new CreateLink(repo);
    const error = await sut.execute({ target });
    
    expect(error.isLeft()).toBeTruthy();
  });
});
