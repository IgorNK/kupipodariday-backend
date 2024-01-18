import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { Wish } from './entities/wish.entity';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
