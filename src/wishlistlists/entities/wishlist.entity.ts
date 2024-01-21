import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import User from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ default: 'Мой вишлист' })
  @Length(1, 250)
  name: string;

  @Column({ default: 'Нет описания' })
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  owner: User;

  @OneToMany(() => Wish, (wish) => wish.wishlist, {
    cascade: true,
  })
  items: Wish[];
}
