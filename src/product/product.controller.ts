import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Roles } from 'src/decorators';
import { UserType } from 'src/user/enum';
import { ProductService } from './product.service';
import { ReturnProductDto, UpdateProductDto } from './dtos';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult } from 'typeorm';

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

  @Roles(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @Roles(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() updatedProduct: UpdateProductDto
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updatedProduct, productId);
  }
}
