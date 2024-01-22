import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt_secret'),
    });
  }

  async validate(jwtPayload: { sub: number }): Promise<UserProfileResponseDto> {
    const user = await this.usersService.findOne(jwtPayload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password: _, ...result } = user;
    return result;
  }
}
