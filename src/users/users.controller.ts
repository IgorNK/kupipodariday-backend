import { Controller, Inject, Header, Get, Put, Post, Param, Body, UseFilters, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserExistsExceptionFilter } from './filters/user-exists.filter';
import { UserNotFoundExceptionFilter } from './filters/user-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('users')
@UseInterceptors(CacheInterceptor)
@SkipThrottle()
@UseFilters(UserExistsExceptionFilter, UserNotFoundExceptionFilter)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private usersService: UsersService
  ) {}

  @CacheKey('user')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(parseInt(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateById(parseInt(id), updateUserDto);
  }
}