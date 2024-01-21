import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { WishesModule } from 'src/wishes/wishes.module';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Wish } from 'src/wishes/entities/wish.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Offer, Wish]),
    WishesModule,
  ],
  controllers: [OffersController],
  providers: [OffersService, WishesService],
  exports: [OffersService],
})
export class OffersModule {}
