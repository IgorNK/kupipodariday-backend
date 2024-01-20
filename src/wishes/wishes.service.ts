import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import User from '../users/entities/user.entity';
import { WishNotFoundException } from './exceptions/wish-not-found.exception';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    const wishWithUser = {
      ...createWishDto,
      owner: {
        id: user.id,
      },
    };
    const wish = this.wishRepository.create(wishWithUser);
    return this.wishRepository.save(wish);
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
    console.log(`wishes service find one by id: ${id}`);
    return this.wishRepository.findOne({
      where: {
        id,
      },
      relations: ['owner', 'offers'],
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  async findLast(): Promise<Wish> {
    return this.wishRepository.findOne({
      where: {},
      order: { createdAt: 'DESC' },
      relations: ['owner', 'offers'],
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  async findTop(): Promise<Wish> {
    return this.wishRepository.findOne({
      where: {},
      order: { copied: 'DESC' },
      relations: ['owner', 'offers'],
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  async findByUser(user: User) {
    console.log(`withes service find one by user: ${user.username}`);
    return this.wishRepository.find({
      where: {
        owner: {
          id: user.id,
        },
      },
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
