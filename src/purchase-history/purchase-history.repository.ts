import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppRepository } from "src/app.repository";
import { purchaseHistoryDocument } from "./purchase-history.schema";

@Injectable()
export class PurchaseHistoryRepository extends AppRepository<purchaseHistoryDocument> {
    constructor(
        @InjectModel('PurchaseHistory')
        private readonly purchaseHistoryModel: Model<purchaseHistoryDocument>
    ) {
        super(purchaseHistoryModel)
    }

    async findAllByUserId(userId: string) {
        return this.purchaseHistoryModel.find({ userId }).sort('createdAt')
    }

    async findAll(condition?: Object, ref?: string[]): Promise<any> {
        return this.findAll(condition,["userId", "accountId"])
    }

} 