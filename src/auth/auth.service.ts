import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SigninUserDto } from '../users/dto/sign-in-user.dto';
import { SigninUserResponseDto } from '../users/dto/sign-in-user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async auth(user: Omit<User, 'password'>): Promise<SigninUserResponseDto> {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByUsername(username);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const { password: _, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signin(signinUserDto: SigninUserDto): Promise<SigninUserResponseDto> {
    const { username, password } = signinUserDto;
    const user = await this.validatePassword(username, password);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    return this.auth(user);
  }
}
