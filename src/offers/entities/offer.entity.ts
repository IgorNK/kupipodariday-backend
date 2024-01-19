import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Offer ID',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn()
  @ApiProperty()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @JoinColumn()
  @ApiProperty()
  item: Wish;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({
    description: 'How many items',
    example: '1',
  })
  @Min(1)
  amount: number;

  @Column({ default: false })
  @ApiProperty({
    description: 'Is user hidden',
    example: 'false',
  })
  hidden: boolean;
}
