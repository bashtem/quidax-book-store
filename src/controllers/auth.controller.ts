import { Request, Response } from "express";
import { getUserRepo } from "../repository/user.repository";
import { ILoginDto } from "../dto/auth.dto";
import { badRequest, okSuccess, serverError } from "../utils/response";
import * as Jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {

    try {

        const {username, password}: ILoginDto = req.body;

        const user = await getUserRepo(username);

        if(!user) return badRequest(res, {}, 'Username or Password is Incorrect');

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch )  return badRequest(res, {}, 'Username or Password is Incorrect');
        
        const token = Jwt.sign({...user}, process.env.JWT_SECRET);

        return okSuccess(res, {token: `Bearer ${token}`})
        
    } catch (error) {
        
        return serverError(res);
    }    
}