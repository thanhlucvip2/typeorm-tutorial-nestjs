import { ClientEntity } from './../client/client.entity';
import { ProductEntity } from './product.entity';
import { ProductDto } from './product.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductDto>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async getAllProduct() {
    return await this.productRepository.find();
  }
  async createProduct(body: ProductDto, id: string) {
    const newProduct = await this.productRepository.create(body);

    const user = await this.clientRepository.findOne({ where: { id } });

    return await this.productRepository.save({ ...newProduct, client: user });
  }
}
