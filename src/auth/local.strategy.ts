import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/users/dto/sign-in-user.dto';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<UserProfileResponseDto> {
    // console.log(`local strategy: validating user ${username} ${password}`);
    const user = await this.authService.validatePassword(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
