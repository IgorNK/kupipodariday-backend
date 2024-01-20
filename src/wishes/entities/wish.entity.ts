import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Length, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import User from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from 'src/wishlistlists/entities/wishlist.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Item ID',
    example: '1',
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  updatedAt: Date;

  @Column()
  @ApiProperty({
    description: 'Item name',
    example: 'item',
  })
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  @ApiProperty({
    description: 'Link to the web store',
    example: 'ebay.com',
  })
  link: string;

  @Column()
  @IsUrl()
  @ApiProperty({
    description: 'Link to image',
    example: 'http://example.com/image.png',
  })
  image: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({
    description: "The item's price",
    example: '100',
  })
  @Min(1)
  price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  @ApiProperty({
    type: () => User,
  })
  owner: User;

  @Column()
  @ApiProperty({
    description: "The item's description",
    example: 'About item',
  })
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  @ApiProperty()
  offers: Offer[];

  @Column('int', { default: 0 })
  @ApiProperty()
  copied: number;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  @JoinColumn()
  wishlist: Wishlist;
}
