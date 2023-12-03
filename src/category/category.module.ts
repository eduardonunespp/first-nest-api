import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entitie';

@Module({
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController]
})
export class CategoryModule {}
