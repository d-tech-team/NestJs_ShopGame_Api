import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from 'src/image/image.module';
import { userSchema } from './user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User',
    schema: userSchema
  }]), ImageModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService]
})
export class UserModule { }
