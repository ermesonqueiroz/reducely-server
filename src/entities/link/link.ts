import { Target } from './target';
import { LinkData } from './link-data';
import { LinkId } from './id';
import { Either, left, right } from '../../common/either';
import { InvalidTargetError } from './errors/invalid-target';

export class Link {
  public readonly id: LinkId;
  public readonly target: Target;
  public readonly createdAt: Date;
  public readonly accessCount: number;

  private constructor(id: LinkId, target: Target, createdAt: Date) {
    this.id = id;
    this.target = target;
    this.createdAt = createdAt;
    this.accessCount = 0;
  }

  static create({ target }: Omit<LinkData, 'id' | 'createdAt' | 'accessCount'>): Either<InvalidTargetError, Link> {
    const id = LinkId.create();
    const targetOrError: Either<InvalidTargetError, Target> = Target.create(target);
    const createdAt = new Date();

    if (targetOrError.isLeft()) return left(new InvalidTargetError(target));

    return right(new Link(id, targetOrError.value, createdAt));
  }
}
