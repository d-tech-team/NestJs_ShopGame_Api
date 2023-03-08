import { IsEmail, IsNotEmpty } from "class-validator";

export class signupDTO {
    @IsNotEmpty()
    name: string
    
    @IsEmail()
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    repassword: string

}