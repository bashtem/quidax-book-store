import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { badRequest } from "../utils/response";
import { BookLikeValidator, BookRatingValidator } from "../validators/book.validator";
import { IBookRatingDto } from "../dto/book.dto";

export const validateBookRating = async (req: Request, res: Response, next: NextFunction) => {

    const {bookId, rating}: IBookRatingDto = req.body;

    const bookRating = new BookRatingValidator();

    bookRating.bookId = bookId;

    bookRating.rating = rating;

    const errors = await validate(bookRating);

    if(errors.length > 0)
        return badRequest(res, errors)
    
    next();
}

export const validateBookLike = async (req: Request, res: Response, next: NextFunction) => {

    const {bookId} = req.body;

    const bookReaction = new BookLikeValidator();

    bookReaction.bookId = bookId;

    const errors = await validate(bookReaction);

    if(errors.length > 0)
        return badRequest(res, errors)
    
    next();
}