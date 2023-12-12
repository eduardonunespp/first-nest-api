import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProductMock, productMock, updatedProductMock } from '../mocks';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/mocks';
import { returnDeleteMock } from '../../mocks';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock)
          }
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock)
          }
        }
      ]
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return error in exception BD', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });

  it('should return product in find by Id', async () => {
    const product = await service.findProductById(productMock.id);

    expect(product).toEqual(productMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return error in exception BD', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return deleted true in delete product', async () => {
    const deleted = await service.deleteProduct(productMock.id);

    expect(deleted).toEqual(returnDeleteMock);
  });

  it('should return updated true in updated product', async () => {
    const updated = await service.updateProduct(
      updatedProductMock,
      productMock.id
    );

    expect(updated).toEqual(productMock);
  });

  it('should return error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(updatedProductMock, productMock.id)
    ).rejects.toThrowError();
  });
});
