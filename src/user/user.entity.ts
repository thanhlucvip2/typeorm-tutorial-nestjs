import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PhotoEntity } from 'src/photos/photo.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];
}
