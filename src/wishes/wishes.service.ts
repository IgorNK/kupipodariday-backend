import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishNotFoundException } from './exceptions/wish-not-found.exception';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishRepository.create(createWishDto);
  }

  async copy(id: number) {
    const wish: Wish = await this.findOne(id);
    if (!wish) {
      throw new WishNotFoundException();
    }
    return this.wishRepository.create(wish as CreateWishDto);
  }

  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    return this.wishRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findLast(): Promise<Wish> {
    return this.wishRepository.findOne({
      order: { createdAt: 'ASC' },
    });
  }

  async findTop(): Promise<Wish> {
    return this.wishRepository.findOne({
      order: { createdAt: 'DESC' },
    });
  }

  async updateOne(
    id: number,
    updateWishDto: UpdateWishDto,
  ): Promise<UpdateResult> {
    const wish = await this.findOne(id);
    if (!wish) {
      throw new WishNotFoundException();
    }
    return this.wishRepository.update(id, updateWishDto);
  }

  async removeOne(id: number): Promise<DeleteResult> {
    const wish = await this.findOne(id);
    if (!wish) {
      throw new WishNotFoundException();
    }
    return this.wishRepository.delete(id);
  }
}
