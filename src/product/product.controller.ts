import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Roles } from 'src/decorators';
import { UserType } from 'src/user/enum';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dtos';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async findAllProducts(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAllProducts()).map(
      (product) => new ReturnProductDto(product)
    );
  }

  @Roles(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }
}
