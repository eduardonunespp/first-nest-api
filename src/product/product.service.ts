import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly categoryService: CategoryService
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Not found products');
    }

    return products;
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);

    return this.productRepository.save({
      ...createProduct
    });
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId
      }
    });

    if (!product) {
      throw new NotFoundException(`Product id: ${product} not found`);
    }

    return product;
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    await this.findProductById(productId);

    return this.productRepository.delete({ id: productId });
  }
}