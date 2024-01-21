import { Inject, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferNotFoundException } from './exceptions/offer-not-found.exception';
import User from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const offerWithUser = {
      ...createOfferDto,
      user,
      item: { id: createOfferDto.itemId },
    };
    const wish = await this.wishRepository.findOne({
      where: {
        id: createOfferDto.itemId,
      },
    });
    wish.raised = Number(+wish.raised) + createOfferDto.amount;
    const offer = this.offerRepository.create(offerWithUser);
    await this.wishRepository.save(wish);
    return this.offerRepository.save(offer);
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   console.log(`offers service create Trying to create offer for id: ${createOfferDto.itemId}, amount: ${createOfferDto.amount}`);
    //   const offerWithUser = {
    //     ...createOfferDto,
    //     user,
    //     item: { id: createOfferDto.itemId },
    //   };
    //   const offer = queryRunner.manager.create(Offer, offerWithUser);
    //   const wish = await queryRunner.manager.findOne(Wish, {
    //     where: {
    //       id: createOfferDto.itemId,
    //     },
    //   });
    //   console.log(
    //     `offers service create: found wish: ${wish.name}, raised: ${wish.raised}`,
    //   );
    //   const raised: number = +wish.raised;
    //   console.log(`raised: ${raised}`);
    //   console.log(typeof raised);
    //   wish.raised = raised + createOfferDto.amount;
    //   await queryRunner.manager.save([offer]);
    //   await queryRunner.manager.save([wish]);
    //   console.log(`offers service create: wish saved, offer created`);
    // } catch (error) {
    //   console.log(`offers service create: couldn't complete transaction`);
    //   console.log(error);
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['user', 'item'],
      select: {
        user: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          wishes: true,
          offers: true,
          wishlists: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'item'],
      select: {
        user: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          wishes: true,
          offers: true,
          wishlists: true,
        },
      },
    });
  }

  async removeOne(id: number): Promise<DeleteResult> {
    const offer = await this.findOne(id);
    if (!offer) {
      throw new OfferNotFoundException();
    }
    return this.offerRepository.delete(id);
  }
}
