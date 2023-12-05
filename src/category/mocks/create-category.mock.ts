import { CategoryEntity } from '../entities/category.entity';

export const createCategoryMock: CategoryEntity = {
  name: 'categoryMock',
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1
};
