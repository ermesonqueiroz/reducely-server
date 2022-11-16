import { LinkData } from '../../entities/link/link-data';
import { InMemoryLinkRepository } from './in-memory-links-repository';

describe('In memory Links repository', () => {
  it('should add link', async () => {
    const links: LinkData[] = [];
    const stu = new InMemoryLinkRepository(links);
    await stu.add({
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    });
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.id).toEqual('Z5XEhf66');
  });

  it('should return link if link is found', async () => {
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    }];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link?.id).toEqual('Z5XEhf66');
  });

  it('should return null if link is not found', async () => {
    const links: LinkData[] = [];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.findLinkById('Z5XEhf66');
    expect(link).toEqual(null);
  });

  it('should return true if link is found', async () => {
    const links: LinkData[] = [{
      id: 'Z5XEhf66',
      target: 'https://github.com/ermesonqueiroz',
      accessCount: 0,
      createdAt: new Date(),
    }];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.exists('Z5XEhf66');
    expect(link).toBeTruthy();
  });

  it('should return false if link is not found', async () => {
    const links: LinkData[] = [];
    const stu = new InMemoryLinkRepository(links);
    const link = await stu.exists('Z5XEhf66');
    expect(link).toBeFalsy();
  });
});