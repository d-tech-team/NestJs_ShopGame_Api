import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppRepository } from "src/app.repository";
import { accountDocument } from "./account.schema";

@Injectable()
export class AccountRepository extends AppRepository<accountDocument> {
    constructor(
        @InjectModel('Account')
        private readonly accountModel: Model<accountDocument>
    ) {
        super(accountModel)
    }

    async findByCode(code: string): Promise<any> {
        const data = await this.accountModel.findOne({
            code,
            isDelete: false
        })
        return data || false
    }

    async findAllAccount(condition?: Object): Promise<any> {
        return this.findAll(condition, ['images', 'categoryId'])
    }

    async findAAccount(_id: string, condition: Object) {
        return this.findOne(_id, condition, ['images', 'categoryId'])
    }



} 