import { Injectable } from '@nestjs/common';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { PurchaseHistoryRepository } from './purchase-history.repository';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { AccountRepository } from 'src/account/account.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PurchaseHistoryService {
  constructor(
    private readonly purchaseHistoryRepository: PurchaseHistoryRepository,
    private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }
  async create(createPurchaseHistoryDto: CreatePurchaseHistoryDto, header: object) {

    try {
      const token = header['authorization'].replace('Bearer ', '')
      const jwt = this.jwtService.verify(token, {
        secret: 'lctiendat'
      })
      const { code } = createPurchaseHistoryDto

      const account = await this.accountRepository.findByCode(code)
      if (!account) {
        throw new Error("Account not found")
      }
      let { sub: userId } = jwt
      const user = await this.userRepository.findOne(userId)
      if (!user) {
        throw new Error("User not found")
      }

      let { _id: idAccount, price, discount } = account
      const { _id: idUser, cash } = user
      price = price * ((100 - discount) / 100)

      if (!this.userService.checkCashUser(cash, price)) {
        throw new Error("You not enough money")
      }

      await this.accountRepository.delete(idAccount)
      await this.userService.minusMoney(idUser, price)
      await this.purchaseHistoryRepository.create({
        money: price,
        accountId: idAccount,
        userId: idUser
      })

      return {
        success: true,
        data: 'Buy successfully'
      }

    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: error?.message
      }
    }
  }


  async findAll(header: Object) {
    const token = header['authorization'].replace('Bearer ', '')

    try {
      const jwt = this.jwtService.verify(token, {
        secret: 'lctiendat'
      })

      const { sub: userId } = jwt

      const data = await this.purchaseHistoryRepository.findAll({
        userId
      })

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

  async findOne(id: string, header: Object) {
    const token = header['authorization'].replace('Bearer ', '')

    try {
      const jwt = this.jwtService.verify(token, {
        secret: 'lctiendat'
      })

      const { sub: userId } = jwt

      const data = await this.purchaseHistoryRepository.findOne(id, { userId })

      if(!data) {
        throw new Error ('History not found')
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

}
