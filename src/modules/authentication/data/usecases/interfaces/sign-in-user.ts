import { UserSignedDTO } from '../../dtos/user-signed';
import { Either } from '../../../../../app/helpers/either';
import { UserCredentialsDTO } from '../../dtos/user-credentials';
import { BaseError } from '../../../../../common/errors/base-error';

export interface ISignInUserUsecase {
  execute(input: UserCredentialsDTO): Promise<Either<BaseError, UserSignedDTO>>;
}
