import { IsInt, IsNotEmpty, IsOptional, IsPositive, Max } from 'class-validator'

export class BookRatingValidator{
    @IsNotEmpty() bookId: string;
    
    @IsNotEmpty()
    @IsPositive()
    @Max(5)
    @IsInt()
    rating: number;
}

export class BookLikeValidator{
    @IsNotEmpty() bookId: string;
}

export class BookPageValidator{
    @IsOptional()
    @IsPositive()
    page: number;
}