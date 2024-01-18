import { Controller, UseFilters, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExistsExceptionFilter } from './filters/user-exists.filter';
import { User } from '../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@UseFilters(UserExistsExceptionFilter)
@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  async signin() {
    return `This action signs you in`;
  }
}
