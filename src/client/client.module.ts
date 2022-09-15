import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientEntity } from './client.entity';
import { BankEntity } from 'src/bank/bank.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, BankEntity, ProductEntity]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
