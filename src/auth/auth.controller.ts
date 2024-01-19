import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from '../users/dto/sign-in-user.dto';
import { SigninUserResponseDto } from '../users/dto/sign-in-user-response.dto'
import { SignupUserResponseDto } from '../users/dto/sign-up-user-response.dto'

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signin')
  async signin(@Body() body: SigninUserDto): Promise<SigninUserResponseDto> {
    return this.authService.signin(body);
  }

  /*@UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req): Promise<SigninUserResponseDto> {
    return this.authService.auth(req.user);
  }*/
  

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    return this.usersService.create(createUserDto);
  }
}