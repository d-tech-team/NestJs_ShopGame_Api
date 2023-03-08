import { IsArray, IsNotEmpty } from 'class-validator';


export class create {
  @IsNotEmpty()
  name: string
}