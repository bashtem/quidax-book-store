import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CartUpdateValidator{
    @IsNotEmpty() bookId: string;
    
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    quantity: number;
}