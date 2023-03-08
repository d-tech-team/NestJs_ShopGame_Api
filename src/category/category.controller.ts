import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { create, update } from './dto'
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { ImageService } from 'src/image/image.service';
import RoleGuard, { Roles } from 'src/auth/guards/role-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly imageService: ImageService,
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    async findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id)
    }

    @Post()
    @UseGuards(RoleGuard(Roles.Admin))
    @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
    async create(@UploadedFile() file: Express.Multer.File, @Body() body: create) {
        return this.categoryService.create(file, body)
    }

    @Put(":id")
    @UseGuards(RoleGuard(Roles.Admin))
    @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
    async update(@UploadedFile() file: Express.Multer.File, @Body() body: create, @Param('id') id: string) {
        return this.categoryService.update(id, file, body)
    }

    @Delete(":id")
    @UseGuards(RoleGuard(Roles.Admin))
    async delete(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }
}
