import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish]), WishesModule],
  controllers: [UsersController],
  providers: [UsersService, WishesService],
  exports: [UsersService],
})
export class UsersModule {}
