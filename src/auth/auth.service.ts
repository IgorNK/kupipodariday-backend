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

  async auth(user: User): Promise<SigninUserResponseDto> {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(signinUserDto: SigninUserDto): Promise<SigninUserResponseDto> {
    const { username, password } = signinUserDto;
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return this.auth(user);
      }
    }
    throw new BadRequestException('Invalid username or password');
  }
}
