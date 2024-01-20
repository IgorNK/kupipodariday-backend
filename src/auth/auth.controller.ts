import { Controller, Post, Get, Body, UseGuards, Req, UseFilters } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from '../users/dto/sign-in-user.dto';
import { SigninUserResponseDto } from '../users/dto/sign-in-user-response.dto';
import { SignupUserResponseDto } from '../users/dto/sign-up-user-response.dto';
import { UserExistsExceptionFilter } from 'src/users/filters/user-exists.filter';
import { EmailExistsExceptionFilter } from 'src/users/filters/email-exists.filter';

@Controller('')
@UseFilters(UserExistsExceptionFilter, EmailExistsExceptionFilter)
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Post('signin')
  // async signin(@Body() body: SigninUserDto): Promise<SigninUserResponseDto> {
  //   console.log(`called signin for body:`);
  //   console.log(body);
  //   return this.authService.signin(body);
  // }

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(
    @Req() req,
    @Body() body: SigninUserDto,
  ): Promise<SigninUserResponseDto> {
    console.log('auth controller signing in, user in request:');
    console.log(req.user);
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

}
