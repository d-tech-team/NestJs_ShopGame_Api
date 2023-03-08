import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { accountSchema } from './account.schema';
import { CategoryModule } from 'src/category/category.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Account',
    schema: accountSchema
  }]), CategoryModule, ImageModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountRepository]
})

export class AccountModule { }












