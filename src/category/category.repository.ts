import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppRepository } from "src/app.repository";
import { categoryDocument } from "./category.schema";

@Injectable()
export class CategoryRepository extends AppRepository<categoryDocument> {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<categoryDocument>
    ) {
        super(categoryModel)
    }

    async findAllCategory() {
        return this.findAll({}, ['imageId'])
    }

    async findOneCategory(_id: string, condition?: Object): Promise<any> {
        return this.findOne(_id, condition, ["imageId"])
    }

} 