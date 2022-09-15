import { ClientEntity } from 'src/client/client.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name_bank: string;

  @Column('text')
  address_bank: string;

  @Column({ type: 'numeric', nullable: true })
  price: number;
  @Column({ type: 'numeric', nullable: true })
  price1: number;
  @Column({ type: 'numeric', nullable: true })
  price2: number;

  @ManyToOne(() => ClientEntity, (client) => client.banks)
  @JoinColumn({ name: 'clientId', referencedColumnName: 'id' })
  client: ClientEntity;
}
