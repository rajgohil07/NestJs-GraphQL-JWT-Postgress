import { Module } from '@nestjs/common';
import { JWTMiddleware } from './auth.service';

@Module({
  providers: [JWTMiddleware],
})
export class AuthModule {}
