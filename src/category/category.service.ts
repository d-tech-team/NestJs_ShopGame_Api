import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { create, update } from './dto';
import { deleteSingleFile, uploadSingle } from 'src/util/upload.util';
import { ImageRepository } from 'src/image/image.repository';

@Injectable()
export class CategoryService {

    constructor(private readonly categoryRepository: CategoryRepository,
        private readonly imageRepository: ImageRepository
    ) { }

    async findAll() {
        try {
            const data = await this.categoryRepository.findAllCategory();
            return {
                success: true,
                data
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error?.message
            }
        }
    }

    async findOne(_id: string) {
        try {
            const data = await this.categoryRepository.findOneCategory(_id)
            if (!data) {
                throw new NotFoundException("Category not found")
            }

            return {
                success: true,
                data
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error?.message
            }
        }

    }

    async create(file: any, createDto: create) {
        const { name } = createDto
        try {
            if (!file) {
                throw new NotFoundException("Thumbnail not found")
            }

            const thumbnail = await uploadSingle(file.path)

            const { secure_url, public_id } = thumbnail

            const image = await this.imageRepository.create({
                url: secure_url,
                public_id
            })

            await this.categoryRepository.create({
                name,
                imageId: image._id
            })

            return {
                success: true,
                data: "Create successfully"
            }

        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error?.message
            }
        }
    }

    async update(_id: string, file: any, body: update) {
        const { name } = body

        try {
            let data = await this.categoryRepository.findOne(_id)
            if (!data) {
                throw new NotFoundException("Category not found")
            }

            if (!file) {
                await this.categoryRepository.update(_id, { name })
                return {
                    success: true,
                    data: "Update Successfully"
                }
            }

            

            const thumbnail = await uploadSingle(file.path)

            deleteSingleFile(data.imageId.public_id)

            const { secure_url, public_id } = thumbnail

            await this.imageRepository.delete(data.imageId._id)

            const image = await this.imageRepository.create({
                url: secure_url,
                public_id
            })

            await this.categoryRepository.update(_id, {
                name,
                imageId: image._id
            })

            return {
                success: true,
                data: "Update Successfully"
            }

        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error?.message
            }
        }
    }

    async delete(_id: string) {
        try {
            let data = await this.categoryRepository.findOne(_id)
            if (!data) {
                throw new NotFoundException("Category not found");
            }

            deleteSingleFile(data.imageId.public_id)

            await this.imageRepository.delete(data.imageId._id)

            await this.categoryRepository.delete(_id)

            return {
                success: true,
                data: "Delete Successfully"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error?.message
            }
        }
    }
}


