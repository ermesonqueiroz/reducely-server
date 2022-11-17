import { DomainError } from './domain-error';

export class InvalidTargetError extends Error implements DomainError {
  constructor(name: string) {
    super(`The target: "${name} is invalid."`);
    this.name = 'InvalidTargetError';
  }
}
