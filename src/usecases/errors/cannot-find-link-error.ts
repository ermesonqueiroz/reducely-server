import { UsecaseError } from './usecase-error';

export class CannotFindLinkError extends Error implements UsecaseError {
  constructor(id: string) {
    super(`Cannot find link with id: ${id}`);
    this.name = 'CannotFindLinkError';
  }
}
