import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LocalStrategy } from '../auth/local.strategy';
import User from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtService } from '@nestjs/jwt';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([User, Wish]), WishesModule],
  controllers: [UsersController],
  providers: [UsersService, WishesService, JwtStrategy, ConfigService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
