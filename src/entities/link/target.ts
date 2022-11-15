import { Either, left, right } from '../../common/either';
import { InvalidTargetError } from './errors/invalid-target';

export class Target {
  private readonly target: string;

  private constructor(target: string) {
    this.target = target;
    Object.freeze(this);
  }

  static create(target: string): Either<InvalidTargetError, Target> {
    if (!Target.validate(target)) return left(new InvalidTargetError(target));

    return right(new Target(target));
  }

  get value() {
    return this.target;
  }

  static validate(target: string): boolean {
    const tester = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    if (!tester.test(target)) return false;

    return true;
  }
}