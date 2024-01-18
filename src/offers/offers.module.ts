import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
