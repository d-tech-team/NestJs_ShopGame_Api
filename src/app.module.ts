import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CategoryModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODBURI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
