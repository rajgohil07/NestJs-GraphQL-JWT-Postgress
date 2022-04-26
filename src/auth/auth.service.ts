import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { decryptToken } from 'src/common/helper';

@Injectable()
export class JWTMiddleware implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.headers.authorization || null;
    if (token) {
      ctx.user = decryptToken(token);
      return true;
    }
    return null;
  }
}
