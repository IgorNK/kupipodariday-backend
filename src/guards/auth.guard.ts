import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    let user;

    try {
      user = this.jwtService.verify(authorization);
    } catch (error) {
      return false;
    }

    request.locals.user = user;
    return true;
  }
}
