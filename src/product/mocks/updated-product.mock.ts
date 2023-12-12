import { createCategoryMock } from '../../category/mocks';
import { UpdateProductDto } from '../dtos';

export const updatedProductMock: UpdateProductDto = {
  name: 'sim, é um update',
  categoryId: createCategoryMock.id,
  image: 'http://image.com',
  price: 50
};
