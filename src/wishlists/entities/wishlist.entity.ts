import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: "Мой вишлист" })
  @Length(1, 250)
  name: string;

  @Column()
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @Column()
  items: Wish[];
}
