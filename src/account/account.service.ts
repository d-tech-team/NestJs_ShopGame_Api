import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './account.repository';
import { deleteSingleFile, uploadMultiFile } from 'src/util/upload.util';
import { CategoryRepository } from 'src/category/category.repository';
import { ImageRepository } from 'src/image/image.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly imageRepository: ImageRepository
  ) { }
  async create(createDto: CreateAccountDto, files: Array<Object>) {

    const { username, password, price, discount, categoryId } = createDto

    if (files.length === 0) {
      return {
        success: false,
        data: "Image not is empty"
      }
    }

    try {
      const category = await this.categoryRepository.findOne(categoryId)
      if (!category) {
        return {
          success: false,
          data: "Category not found"
        }
      }

      const images = await uploadMultiFile(files)

      const dataImg = await Promise.all(images.map(async img => {
        const image = await this.imageRepository.create({
          url: img.secure_url,
          public_id: img.public_id
        })
        return image._id
      }))

      await this.accountRepository.create({
        code: await this.genCode(),
        username,
        password,
        price,
        discount: discount > 100 ? 100 : price,
        categoryId,
        images: dataImg
      })

      return {
        success: true,
        data: "Create successfully"
      }

    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "Bad request"
      }
    }
  }

  async findAll() {
    try {
      const data = await this.accountRepository.findAllAccount()

      return {
        success: true,
        data
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "Bad request"
      }
    }
  }

  async findOne(_id: string) {
    try {
      const data = await this.accountRepository.findAAccount(_id, ["categoryId", "images"])
      if (!data) {
        return {
          success: false,
          data: "Account not found"
        }
      }
      return {
        success: true,
        data
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "Bad request"
      }
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto, files: Array<Object>) {

    const { username, password, price, discount, categoryId } = updateAccountDto

    try {

      const account = await this.accountRepository.findOne(id)

      if (!account) {
        return {
          success: false,
          data: "Account not found"
        }
      }

      const category = await this.categoryRepository.findOne(categoryId)
      if (!category) {
        return {
          success: false,
          data: "Category not found"
        }
      }

      if (files.length === 0) {
        await this.accountRepository.update(id, {
          username,
          password,
          price,
          discount: discount > 100 ? 100 : price,
          categoryId,
        })

        return {
          success: true,
          data: "Update successfully"
        }
      }

      Promise.all(account.images?.map(async img => {
        const image = await this.imageRepository.findOne(img)
        if (image) {
          await this.imageRepository.delete(image._id)
          deleteSingleFile(image.public_id)
        }
      }))

      const images = await uploadMultiFile(files)

      const dataImg = await Promise.all(images.map(async img => {
        const image = await this.imageRepository.create({
          url: img.secure_url,
          public_id: img.public_id
        })
        return image._id
      }))

      await this.accountRepository.update(id, {
        username,
        password,
        price,
        discount: discount > 100 ? 100 : price,
        categoryId,
        images: dataImg
      })

      return {
        success: true,
        data: "Update successfully"
      }

    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "Bad request"
      }
    }
  }

  async remove(id: string) {
    try {
      const account = await this.accountRepository.findOne(id)
      if (!account) {
        return {
          success: false,
          data: "Account not found"
        }
      }

      Promise.all(account.images?.map(async img => {
        const image = await this.imageRepository.findOne(img)
        if (image) {
          await this.imageRepository.delete(image._id)
          deleteSingleFile(image.public_id)
        }
      }))

      await this.accountRepository.delete(id)
      return {
        success: true,
        data: "Delete successfully"
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "Bad request"
      }
    }
  }


  async genCode() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 11) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    const data = await this.accountRepository.findByCode(code)
    if (data) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return code
  }
}


