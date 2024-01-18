import {
  Controller,
  Inject,
  Header,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
import { UserNotFoundExceptionFilter } from './filters/user-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@UseInterceptors(CacheInterceptor)
@SkipThrottle()
@UseFilters(UserNotFoundExceptionFilter)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private usersService: UsersService,
  ) {}

  @CacheKey('users')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @SkipThrottle({ default: false })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @CacheKey('users')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @CacheKey('users')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':query')
  async findMany(@Param('query') query: string): Promise<User[]> {
    return this.usersService.findMany(query);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateOne(+id, updateUserDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.usersService.removeOne(+id);
  }
}
