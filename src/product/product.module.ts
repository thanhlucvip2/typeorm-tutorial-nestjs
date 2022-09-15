import { ProductEntity } from './product.entity';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ClientEntity])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
