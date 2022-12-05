import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {

    constructor(private readonly categoryRepository: CategoryRepository) { }

    async getAllCategory() {
        return await this.categoryRepository.findAll();
    }

    async create(params: Object) {

        return await this.categoryRepository.create(params);
    }
}
