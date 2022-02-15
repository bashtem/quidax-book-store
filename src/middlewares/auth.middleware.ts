import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ILoginDto } from "../dto/auth.dto";
import { badRequest, customResponse, HttpStatusCode } from "../utils/response";
import { LoginValidator } from "../validators/auth.validator";
import * as Jwt from 'jsonwebtoken'


export const validateCredentials = async (req: Request, res: Response, next: NextFunction) => {

    const {username, password}: ILoginDto = req.body;

    const loginDetails = new LoginValidator();

    loginDetails.username = username;

    loginDetails.password = password;

    const errors = await validate(loginDetails);

    if(errors.length > 0)
        return badRequest(res, errors)
    
    next();
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.header('authorization');

    if(!token) return customResponse(res, HttpStatusCode.UNAUTHORIZED, 'No Authorization token Supplied', 'Unauthorized');

    token = token.split(' ')[1]

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        req['user'] = decoded;

        next();
    
    } catch(err) {
        return customResponse(res, HttpStatusCode.UNAUTHORIZED, 'Authorization token Invalid', 'Unauthorized');
    }
}