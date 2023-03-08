import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/category/category.schema";
import { Image } from "src/image/image.schema";

export type accountDocument = HydratedDocument<Account>

@Schema({ timestamps: true })
export class Account {
    @Prop()
    code: string

    @Prop({
        default: null
    })
    description: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop()
    price: Number

    @Prop({
        default: 0
    })
    discount: Number

    @Prop(
        [{ type: mongoose.Schema.Types.ObjectId, ref: () => Image }]
    )

    @Type(() => Image)
    images: Image

    @Prop(
        { type: mongoose.Schema.Types.ObjectId, ref: () => Category }
    )

    @Type(() => Category)
    categoryId: Category

    @Prop({
        default: false
    })
    isDelete: Boolean
}


export const accountSchema = SchemaFactory.createForClass(Account)