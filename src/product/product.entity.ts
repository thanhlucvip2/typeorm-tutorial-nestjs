import { ClientEntity } from './../client/client.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name_product: string;

  @Column({ type: 'text' })
  price_product: string;

  @Column({ type: 'uuid', nullable: true })
  ids: string;
}
