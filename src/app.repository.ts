import { Model, Document } from "mongoose";

export class AppRepository<T extends Document> {
    constructor(private readonly model: Model<T>) { }

    async findOne(_id: string, condition: Object = {}, ref: string[] = null): Promise<any> {
        return await this.model.findOne({ _id, ...condition, isDelete: false }).populate(ref)
    }

    async findAll(condition: Object = {}, ref: string[] = null): Promise<any> {
        return await this.model.find({ ...condition, isDelete: false }).populate(ref).sort('createdAt')
    }

    async create(data: Object): Promise<any> {
        return await this.model.create(data)
    }

    async update(_id: string, data: Object): Promise<any> {
        return await this.model.updateOne({ _id }, data)
    }

    async delete(_id: string): Promise<any> {
        return await this.model.updateOne({ _id }, { isDelete: true })
    }

}   