import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Length, IsNotEmpty, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({default: "Пока ничего не рассказал о себе"})
  @Length(2, 200)
  about: string;

  @Column({default: "https://i.pravatar.cc/300"})
  @IsUrl()
  avatar: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Column()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}