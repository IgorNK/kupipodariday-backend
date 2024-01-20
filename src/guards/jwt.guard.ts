import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   console.log('JwtGuard canActivate');
  //   return super.canActivate(context);
  // }

  // handleRequest(err: any, user: any) {
  //   console.log('JwtGuard handling request');
  //   if (err || user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
