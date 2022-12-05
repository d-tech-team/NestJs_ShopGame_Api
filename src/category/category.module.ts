import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { Category } from './category';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './category.schema';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Category',
    schema: categorySchema
  }])],
  controllers: [
    CategoryController],
  providers: [Category, CategoryService,CategoryRepository]
})
export class CategoryModule { }
