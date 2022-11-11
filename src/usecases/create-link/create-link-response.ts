import { Either } from '../../common/either';
import { InvalidTargetError } from '../../entities/link/errors/invalid-target';
import { LinkData } from '../../entities/link/link-data';

export type CreateLinkResponse = Either<InvalidTargetError, LinkData>;
