import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
import { Transform, Type } from 'class-transformer';
export type imageDocument = HydratedDocument<Image>

@Schema({ timestamps: true })
export class Image {

    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    url: string

    @Prop({
        default: null
    })
    public_id: string

    @Prop({
        default: false
    })
    isDelete: Boolean
}

export const imageSchema = SchemaFactory.createForClass(Image)