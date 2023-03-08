import { IsNotEmpty } from "class-validator";

export class CreatePurchaseHistoryDto {
    @IsNotEmpty()
    
    code : string
}
