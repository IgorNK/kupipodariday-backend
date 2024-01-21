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

  async copy(id: number, user: User) {
    const copiedWish: Wish = await this.findOne(id);
    if (!copiedWish) {
      throw new WishNotFoundException();
    }
    copiedWish.copied = Number(+copiedWish.copied) + 1;
    const {
      id: _,
      raised,
      owner,
      offers,
      createdAt,
      updatedAt,
      copied,
      ...newWishDto
    } = copiedWish;
    const wishWithUser = {
      ...newWishDto,
      owner: {
        id: user.id,
      },
    };
    const wish = this.wishRepository.create(wishWithUser);
    await this.wishRepository.save(copiedWish);
    return this.wishRepository.save(wish);
  }

  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    console.log(`wishes service find one by id: ${id}`);
    const wish = await this.wishRepository.findOne({
      where: {
        id,
      },
      relations: ['owner', 'offers', 'offers.user'],
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
    wish.offers.forEach((offer) => {
      offer.name = offer.user.username;
      offer.img = offer.user.avatar;
    });
    return wish;
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
