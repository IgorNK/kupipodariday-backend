import {
  Controller,
  Inject,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  UseFilters,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { UserNotFoundExceptionFilter } from './filters/user-not-found.filter';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { WishesService } from 'src/wishes/wishes.service';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

@ApiTags('users')
@Controller('users')
@UseFilters(UserNotFoundExceptionFilter)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get()
  async findAll(): Promise<UserPublicProfileResponseDto[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @SkipThrottle({ default: false })
  @Get('me')
  async findCurrent(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateOne(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async removeOne(@Req() req) {
    return this.usersService.removeOne(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async findCurrentWishes(@Req() req): Promise<Wish[]> {
    return this.wishesService.findByUser(req.user);
  }

  @Post('find')
  async findMany(
    @Body() findUsersDto: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    return this.usersService.findMany(findUsersDto);
  }

  @Get(':username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<UserPublicProfileResponseDto> {
    const user = await this.usersService.findByUsername(username);
    const { password: _, ...rest } = user;
    return rest;
  }

  @Get(':username/wishes')
  async findWishesByUsername(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    const user = await this.usersService.findByUsername(username);
    return this.wishesService.findByUser(user);
  }
}
