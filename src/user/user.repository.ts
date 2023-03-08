import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppRepository } from "src/app.repository";
import { userDocument } from "./user.schema";

@Injectable()
export class UserRepository extends AppRepository<userDocument> {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<userDocument>
    ) {
        super(userModel)
    }

    async findByUsername(username: string): Promise<any> {
        const data = await this.userModel.findOne({
            username
        })
        return data || false
    }


} 