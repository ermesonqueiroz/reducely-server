export class LinkId {
  private readonly id: string;

  private constructor(id: string) {
    this.id = id;
    Object.freeze(this);
  }

  static create() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

    const id = new Array(8)
      .fill(null)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');

    return new LinkId(id);
  }

  get value() {
    return this.id;
  }
}
