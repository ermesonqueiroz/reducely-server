import { Target } from './target';

describe('Target url validator', () => {
  it('should not accept invalid url', () => {
    expect(Target.validate('invalid_url')).toBeFalsy();
  });

  it('should not accept url without https://', () => {
    expect(Target.validate('www.github.com')).toBeTruthy();
  });

  it('should accept mailto:', () => {
    expect(Target.validate('mailto:ermeson.s.queiroz@gmail.com')).toBeTruthy();
  });

  it('should not create link with invalid target (only blank spaces)', () => {
    expect(Target.validate('    ')).toBeFalsy();
  });
});
