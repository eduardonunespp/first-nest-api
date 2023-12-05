import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators';
import { UserType } from '../user/enum';
import { CategoryEntity } from './entities/category.entity';
import { createCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategoryDto(category)
    );
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: createCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
}
