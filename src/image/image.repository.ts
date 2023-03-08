import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppRepository } from "src/app.repository";
import { imageDocument } from "./image.schema";

@Injectable()
export class ImageRepository extends AppRepository<imageDocument> {
    constructor(
        @InjectModel('Image')
        private readonly imageModel: Model<imageDocument>
    ) {
        super(imageModel)
    }

} 