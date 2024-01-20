import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlistlists/entities/wishlist.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNotEmpty()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  @IsNotEmpty()
  updatedAt: Date;

  @Column({ unique: true })
  @ApiProperty({
    description: "The user's name",
    example: 'John Doe',
  })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @ApiProperty({
    description: "User's about",
    example: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  @IsNotEmpty()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @ApiProperty({
    description: "User's avatar",
    example: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @ApiProperty({
    description: "The user's email",
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @ApiProperty({
    description: "The user's password",
    example: 'derpassword',
  })
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  @ApiProperty()
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  @ApiProperty()
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  @ApiProperty()
  wishlists: Wishlist[];
}
