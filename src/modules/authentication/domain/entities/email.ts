import { InvalidEmailError } from '../errors/invalid-email';
import { HttpStatusCode } from '../../../../app/helpers/http';
import { ApiError } from '../../../../app/helpers/api-error';
import { Either, left, right } from '../../../../app/helpers/either';
import { isEmailValid } from '../../../../app/utils/email-validation';

export class EmailEntity {
  private constructor(public readonly email: string) {}

  public static create(email: string): Either<ApiError, EmailEntity> {
    if (!isEmailValid(email)) {
      const invalidEmailError = new InvalidEmailError(
        HttpStatusCode.BAD_REQUEST,
        'The email must be a valid email.',
      );
      return left(invalidEmailError);
    }

    const emailEntity = new EmailEntity(email);
    return right(emailEntity);
  }
}
