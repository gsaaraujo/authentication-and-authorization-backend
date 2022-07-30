import { NextFunction, Request, Response, Router } from 'express';
import {
  authorizeUserService,
  signInController,
} from '../di/sign-in-controller';
import { HttpRequest, HttpResponse } from '../../../../app/helpers/http';
import { BaseError } from '../../../../common/errors/base-error';
import { SignInRequest } from '../../adapters/controllers/sign-in';

const authenticationRouter = Router();

authenticationRouter.post(
  '/auth/sign-in',
  async (request: Request, response: Response) => {
    const signInRequest: SignInRequest = {
      email: request.body,
      password: request.body,
    };
    const httpRequest = { data: signInRequest };
    const httpResponse: HttpResponse = await signInController.handle(
      httpRequest,
    );
    response.status(httpResponse.statusCode).json({ data: httpResponse.data });
  },
);

authenticationRouter.use(
  async (request: Request, response: Response, next: NextFunction) => {
    const accessToken = request.headers.authorization ?? '';
    const authorizeOrError = await authorizeUserService.verifyAuthorization(
      accessToken,
    );

    if (authorizeOrError.isLeft()) {
      const error: BaseError = authorizeOrError.value;
      response.status(403).json({ data: error });
    }

    next();
  },
);

export { authenticationRouter };
