import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Header,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishNotFoundExceptionFilter } from './filters/wish-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('wishes')
@ApiTags('wishes')
@UseFilters(WishNotFoundExceptionFilter)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createWishDto: CreateWishDto,
  ): Promise<Wish> {
    return this.wishesService.create(createWishDto, req.user);
  }


  @CacheKey('wishes_findAll')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get()
  async findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @CacheKey('wishes_last')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get('last')
  async findLast(): Promise<Wish[]> {
    console.log('Wishes controller find last');
    const wish = await this.wishesService.findLast();
    return [wish];
  }

  @CacheKey('wishes_top')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get('top')
  async findTop(): Promise<Wish[]> {
    console.log('wishes controller find top');
    const wish = await this.wishesService.findTop();
    return [wish];
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Req() req, @Param('id') id: string): Promise<Wish> {
    console.log(`wishes controller copy: ${id}`);
    return this.wishesService.copy(+id, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wish> {
    console.log(`wishes controller find one: ${id}`);
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<UpdateResult> {
    return this.wishesService.updateOne(+id, updateWishDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.wishesService.removeOne(+id);
  }
}
