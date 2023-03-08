import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';


@Injectable()
export class ImageService {

  constructor(private readonly imageRepository: ImageRepository) { }

  async findAll() {
    return await this.imageRepository.findAll();
  }

  async findOne(_id: string) {
    return await this.imageRepository.findOne(_id)
  }

  async create(data: Object) {

    return await this.imageRepository.create(data);
  }

  async update(_id: string, data: Object) {
    return await this.imageRepository.update(_id, data)
  }

  async delete(_id: string) {
    return await this.imageRepository.delete(_id)
  }
}