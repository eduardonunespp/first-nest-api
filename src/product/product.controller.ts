import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators';
import { UserType } from 'src/user/enum';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dtos';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAllProducts()).map(
      (product) => new ReturnProductDto(product)
    );
  }
}
