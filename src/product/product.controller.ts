import { ProductDto } from './product.dto';
import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getClient() {
    return await this.productService.getAllProduct();
  }
  @Post(':id')
  async createClient(@Body() body: ProductDto, @Param('id') id: string) {
    return this.productService.createProduct(body, id);
  }
}
