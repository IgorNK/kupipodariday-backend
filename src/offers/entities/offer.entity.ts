import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import User from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Offer ID',
    example: 1,
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

  name: string;

  img: string;

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn()
  @ApiProperty()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @JoinColumn()
  @ApiProperty()
  item: Wish;

  @Column('numeric', { scale: 2 })
  @ApiProperty({
    description: 'How much to raise',
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
