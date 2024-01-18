import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Header,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferNotFoundExceptionFilter } from './filters/offer-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@Controller('offers')
@ApiTags('offers')
@UseInterceptors(CacheInterceptor)
@SkipThrottle()
@UseFilters(OfferNotFoundExceptionFilter)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @CacheKey('offers')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @CacheKey('offers')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @CacheKey('offers')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
