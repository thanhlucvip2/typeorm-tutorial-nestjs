import { ProductEntity } from 'src/product/product.entity';
import { BankEntity } from './../bank/bank.entity';
import { ClientDto } from './client.dto';
import { ClientEntity } from './client.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>,
    private emBi: EntityManager,
  ) {}
  async getAllClient() {
    const stream = await this.emBi
      .createQueryBuilder(ClientEntity, 'client')
      .select('client')
      .maxExecutionTime(1)
      .getMany();

    return stream;
  }

  async createClient(body: ClientDto) {
    const newClient = await this.clientRepository.create(body);
    const banks = await this.bankRepository.find({
      where: { id: body.bankId },
    });
    console.log({ banks: banks });

    // return await this.clientRepository.save({ ...newClient, banks });
  }
}
