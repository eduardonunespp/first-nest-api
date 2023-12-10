import { createCategoryMock } from '../../category/mocks';
import { CreateProductDto } from '../dtos/create-product.dto';

export const createProductMock: CreateProductDto = {
  name: 'sim',
  categoryId: createCategoryMock.id,
  image: 'http://image.com',
  price: 55.4
};
