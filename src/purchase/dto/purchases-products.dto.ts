import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty } from 'class-validator';

export class PurchaseProductDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number;
    
    @IsNotEmpty()
    totalPrice!: number;
}