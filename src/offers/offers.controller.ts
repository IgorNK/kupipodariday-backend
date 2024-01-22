import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Header,
  UseFilters,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferNotFoundExceptionFilter } from './filters/offer-not-found.filter';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('offers')
@ApiTags('offers')
@SkipThrottle()
@UseFilters(OfferNotFoundExceptionFilter)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto, req.user);
  }

  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
}
