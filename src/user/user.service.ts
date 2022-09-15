import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // private embi: EntityManager,
  ) {}
  async getAll() {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.photos', 'photo')
      .select('user.name')
      .addSelect('photo.url')
      .where('photo.isActive = :active', { active: 'true' })
      .getMany();
    console.log(user);

    return await user;
  }
}
