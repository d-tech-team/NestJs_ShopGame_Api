import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { imageSchema } from './image.schema';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Image',
    schema: imageSchema
  }])],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  exports: [ImageService, ImageRepository]
})
export class ImageModule { }
