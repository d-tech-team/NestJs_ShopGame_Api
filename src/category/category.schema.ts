import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { imageSchema, Image } from "src/image/image.schema";

export type categoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
    @Prop()
    name: string

    @Prop(
        { type: mongoose.Schema.Types.ObjectId, ref: () => Image }
    )

    @Type(() => Image)
    imageId: Image

    @Prop({
        default: false
    })
    isDelete: Boolean
}

export const categorySchema = SchemaFactory.createForClass(Category)