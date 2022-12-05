import { Body, Controller, Get, Param, Post, Query, Response } from '@nestjs/common';
import { createCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }
    @Get()
    getAll() {
        return this.categoryService.getAllCategory()
    }

    @Post()
    create(@Body() createCategoryDto: createCategoryDto,) {
        return this.categoryService.create(createCategoryDto)
    }
}
