import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Length, IsUrl, Min } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column("decimal", { precision: 10, scale: 2 })
  @Min(1)
  price: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  raised: number;

  @Column()
  @ManyToOne(() => User, user => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  @OneToMany(() => Offer, offer => offer.item)
  offers: Offer[];

  @Column("int", { default: 0 })
  copied: number;
}
