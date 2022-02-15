import { Response } from "express";

export const enum HttpStatusCode{
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const okSuccess = (res: Response, obj: object, message = 'Success') => {
    const resObj = {
      data: obj,
      message: message,
      statusCode: HttpStatusCode.OK,
    };
    return res.status(HttpStatusCode.OK).json(resObj);
}

export const okCreated  = (res: Response, obj: object, message = 'Created') => {
    const resObj = {
      data: obj,
      message: message,
      statusCode: HttpStatusCode.CREATED,
    };
    return res.status(HttpStatusCode.CREATED).json(resObj);
}
  
export const badRequest = (res: Response, errors?: Object, message = '') => {
    const resObj = {
      errors,
      message: message,
      statusCode: HttpStatusCode.BAD_REQUEST
    };
    return res.status(HttpStatusCode.BAD_REQUEST).json(resObj);
}

export const notFound = (res: Response, message = 'Resource(s) not found') => {
    const resObj = {
      message: message,
      statusCode: HttpStatusCode.NOT_FOUND
    };
    return res.status(HttpStatusCode.NOT_FOUND).json(resObj);
}

export const serverError = (res: Response, message = '', code = 'Server Error') => {
    const resObj = {
      code: code,
      message: message,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(resObj);
}

export const customResponse = (res: Response, statusCode: HttpStatusCode, errors?: Object,  message = '') => {
    const resObj = {
      errors,
      message: message,
      statusCode
    };
    return res.status(statusCode).json(resObj);
}