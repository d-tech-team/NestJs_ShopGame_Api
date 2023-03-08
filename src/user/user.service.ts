import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  checkCashUser(cash: number, price: number) {
    return cash > price || false
  }

  async minusMoney(userId: string, money: number) {
    const data = await this.userRepository.findOne(userId)
    const { cash } = data
    return this.userRepository.update(userId, {
      cash: cash - +money
    })

  }
}
