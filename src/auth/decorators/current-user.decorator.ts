import { UserFromJwt } from './../models/UserFromJwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserFromJwt => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
