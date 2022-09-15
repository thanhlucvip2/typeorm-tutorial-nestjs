import { UserEntity } from './../user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: 'text', nullable: true })
  isActive: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.photos)
  user: UserEntity;
}
