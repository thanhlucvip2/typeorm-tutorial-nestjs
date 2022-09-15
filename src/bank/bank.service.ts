import { ClientEntity } from './../client/client.entity';
import { BankEntity } from './bank.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, EntityManager, Repository } from 'typeorm';
import { BankDto } from './bank.dto';
@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>,
    private emBi: EntityManager,
  ) {}
  async getBank() {
    const result = await this.emBi
      .createQueryBuilder(BankEntity, 'bank')
      .getMany();

    return result;
  }
  async createBank(body: BankDto) {
    const newBank = await this.bankRepository.create(body);
    return await this.bankRepository.save(newBank);
  }
}
