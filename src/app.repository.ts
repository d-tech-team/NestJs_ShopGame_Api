import { Model, Document } from "mongoose";

export class AppRepository<T extends Document> {
    constructor(private readonly model: Model<T>) { }

    async create(data: Object): Promise<any> {
        return await this.model.create(data)
    }

    async findAll(): Promise<any> {
        return await this.model.find({})
    }
}