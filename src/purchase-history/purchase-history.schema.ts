import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/account/account.schema";
import { User } from "src/user/user.schema";

export type purchaseHistoryDocument = HydratedDocument<PurchaseHistory>

@Schema({ timestamps: true })
export class PurchaseHistory {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
    userId: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Account })
    accountId: Account

    @Prop()
    money: number

    @Prop({
        default: false
    })
    isDelete: Boolean
}

export const purchaseHistorySchema = SchemaFactory.createForClass(PurchaseHistory)