import { Module } from '@nestjs/common';
import { PurchaseHistoryService } from './purchase-history.service';
import { PurchaseHistoryController } from './purchase-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { purchaseHistorySchema } from './purchase-history.schema';
import { AccountModule } from 'src/account/account.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PurchaseHistoryRepository } from './purchase-history.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'PurchaseHistory',
      schema: purchaseHistorySchema
    }]), AccountModule, UserModule
  ],
  controllers: [PurchaseHistoryController],
  providers: [PurchaseHistoryService, PurchaseHistoryRepository, JwtService]
})
export class PurchaseHistoryModule { }
