import { IsEmail, IsNotEmpty } from "class-validator";

export class signinDTO {

    @IsEmail()
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

}