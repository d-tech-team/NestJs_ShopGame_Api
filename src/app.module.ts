import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';

import { ImageModule } from './image/image.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseHistoryModule } from './purchase-history/purchase-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODBURI),
    CategoryModule,
    AuthModule,
    ImageModule,
    AccountModule,
    UserModule,
    PurchaseHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
