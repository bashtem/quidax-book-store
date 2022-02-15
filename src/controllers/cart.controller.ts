import { Request, Response } from "express";
import { ICartDto } from "src/dto/cart.dto";
import { User } from "../entity/user.entity";
import { cartWithSubTotalService, createOrUpdateCartService } from "../services/cart.service";
import { badRequest, HttpStatusCode, notFound, okSuccess, serverError } from "../utils/response";

export const fetchCartItems = async (req: Request, res: Response) => {

    try {

        const cartsWithSubtotal = await cartWithSubTotalService(req['user'] as User)
    
        return okSuccess(res, cartsWithSubtotal);
    
    } catch (error) {
    
        return serverError(res);
    }
}


export const addOrUpdateCart = async (req: Request, res: Response) => {

    try {

        const body: ICartDto = req.body

        const cart = await createOrUpdateCartService(body, req['user'] as User);

        return okSuccess(res, cart)
    
    } catch (error) {

        if(error.message === HttpStatusCode.NOT_FOUND.toString())
            return notFound(res);
        
        if(error.message === HttpStatusCode.BAD_REQUEST.toString())
            return badRequest(res, "You have exceeded our Stock Quantity");

        return serverError(res);
    }
}