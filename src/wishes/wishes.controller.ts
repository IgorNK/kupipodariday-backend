import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishNotFoundExceptionFilter } from './filters/wish-not-found.filter';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

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

  @Get()
  async findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @Get('last')
  async findLast(): Promise<Wish[]> {
    return this.wishesService.findLast(40);
  }

  @Get('top')
  async findTop(): Promise<Wish[]> {
    return this.wishesService.findTop(20);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Req() req, @Param('id') id: number): Promise<Wish> {
    return this.wishesService.copy(id, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wish> {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOne(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<UpdateResult> {
    return this.wishesService.updateOne(id, updateWishDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeOne(@Req() req, @Param('id') id: number): Promise<DeleteResult> {
    return this.wishesService.removeOne(id, req.user);
  }
}
