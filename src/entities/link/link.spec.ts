import { InvalidTargetError } from './errors/invalid-target';
import { Link } from './link';
import { left } from '../../common/either';

describe('Link domain entity', () => {
  it('should not create link with invalid target', () => {
    const target = 'invalid_url';
    const link = Link.create({ target });

    expect(link).toEqual(left(new InvalidTargetError(target)));
  });

  it('should create link with valid target without https://', () => {
    const target = 'www.github.com';
    const link = Link.create({ target });

    expect(link.isRight()).toEqual(true);
  });

  it('should create link with target mailto:', () => {
    const target = 'mailto:ermeson.s.queiroz@gmail.com';
    const link = Link.create({ target });

    expect(link.isRight()).toEqual(true);
  });

  it('should not create link with invalid target (only blank spaces)', () => {
    const target = '    ';
    const link = Link.create({ target });

    expect(link).toEqual(left(new InvalidTargetError(target)));
  });
});
