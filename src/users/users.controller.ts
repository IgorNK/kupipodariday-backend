import {
  Controller,
  Inject,
  Header,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  UseFilters,
  UseInterceptors,
  UseGuards,
  ForbiddenException,
  Req,
  Res,
} from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import User from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { UserNotFoundExceptionFilter } from './filters/user-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { AppDataSource } from 'ormconfig';
import { WishesService } from 'src/wishes/wishes.service';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';

@ApiTags('users')
@Controller('users')
@SkipThrottle()
@UseFilters(UserNotFoundExceptionFilter)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  // @UseGuards(JwtGuard)
  // @Get('me')
  // async profile(@Req() req: Request) {
  //   const user = req.user;
  //   return `Logged in as ${user.username}`;
  // }

  // @CacheKey('users')
  // @CacheTTL(3600)
  // @Header('Cache-Control', 'no-cache, max-age=3600')
  @SkipThrottle({ default: false })
  @Get()
  async findAll(): Promise<UserPublicProfileResponseDto[]> {
    this.logger.warn('find all called');
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  // @CacheKey('users')
  // @CacheTTL(3600)
  // @Header('Cache-Control', 'no-cache, max-age=3600')
  @SkipThrottle({ default: false })
  @Get('me')
  async findCurrent(@Req() req) {
    console.log('user controller get me, user in request: ');
    console.log(req.user);
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateOne(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async removeOne(@Req() req) {
    return this.usersService.removeOne(req.user.id);
  }

  // @CacheKey('wishes')
  // @CacheTTL(3600)
  // @Header('Cache-Control', 'no-cache, max-age=3600')
  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async findCurrentWishes(@Req() req): Promise<Wish[]> {
    console.log('wishes controller get me wishes');
    console.log(req.user);
    return this.wishesService.findByUser(req.user);
  }

  // @CacheKey('users')
  // @CacheTTL(3600)
  // @Header('Cache-Control', 'no-cache, max-age=3600')
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(+id);
  // }

  @Post('find')
  async findMany(@Body() findUsersDto: FindUsersDto): Promise<UserPublicProfileResponseDto[]> {
    console.log(`user controller get find, query: ${findUsersDto}`);
    return this.usersService.findMany(findUsersDto);
  }

  // @CacheKey('users')
  // @CacheTTL(3600)
  // @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<UserPublicProfileResponseDto> {
    console.log(`user controller find by username: ${username}`);
    const user = await this.usersService.findByUsername(username);
    const { password, ...rest } = user;
    return rest;
  }

  // @CacheKey('wishes')
  // @CacheTTL(3600)
  // @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':username/wishes')
  async findWishesByUsername(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    const user = await this.usersService.findByUsername(username);
    console.log(`users controller find wishes by username: ${username}`);
    return this.wishesService.findByUser(user);
  }
}
