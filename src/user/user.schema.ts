import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { Roles } from "src/auth/guards/role-auth.guard";
import { Image } from "src/image/image.schema";

export type userDocument = HydratedDocument<Image>

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop(
        { type: mongoose.Schema.Types.ObjectId, ref: () => Image }
    )

    @Type(() => Image)
    avatar: Image

    @Prop({
        default: 0
    })
    cash: number

    @Prop({
        enum: Roles,
        default: Roles.User
    })

    role: string

    @Prop({ default: false })
    isActive: Boolean

    @Prop({
        default: null
    })
    otp: Array<string>

    @Prop({
        default: null
    })
    history: Array<string>

    @Prop({
        default: false
    })
    isDelete: Boolean

}

export const userSchema = SchemaFactory.createForClass(User)