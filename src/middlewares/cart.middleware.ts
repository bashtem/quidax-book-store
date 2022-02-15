import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CartUpdateValidator } from "../validators/cart.validator";
import { badRequest } from "../utils/response";

export const validateCartUpdate = async (req: Request, res: Response, next: NextFunction) => {

    const {bookId, quantity} = req.body;

    const cartUpdate = new CartUpdateValidator();

    cartUpdate.bookId = bookId;
    
    cartUpdate.quantity = quantity;

    const errors = await validate(cartUpdate);

    if(errors.length > 0)
        return badRequest(res, errors)
    
    next();
}