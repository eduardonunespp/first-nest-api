import { createCategoryMock } from '../../category/mocks';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: createCategoryMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 7368,
  image: 'http://image.com',
  name: 'name product mock',
  price: 55.4
};
