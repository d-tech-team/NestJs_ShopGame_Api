import { IsArray, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    @IsNumberString()
    @IsNotEmpty()
    price: number

    discount: number

    @IsNotEmpty()
    categoryId: string
}
