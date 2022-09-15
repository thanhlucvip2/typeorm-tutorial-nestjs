import { BankEntity } from './../bank/bank.entity';
import { ProductEntity } from './../product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => BankEntity, (bank) => bank.client, {
    nullable: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'clientId' })
  banks: BankEntity[];
}
