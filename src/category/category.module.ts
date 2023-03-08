import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './category.schema';
import { CategoryRepository } from './category.repository';
import { ImageModule } from 'src/image/image.module';


@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Category',
    schema: categorySchema
  }]), ImageModule],
  controllers: [
    CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository]
})
export class CategoryModule { }
