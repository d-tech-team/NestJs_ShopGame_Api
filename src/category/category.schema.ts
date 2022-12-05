import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type categoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
    @Prop()
    name: string

    @Prop()
    thumbnail: string
}

export const categorySchema = SchemaFactory.createForClass(Category)