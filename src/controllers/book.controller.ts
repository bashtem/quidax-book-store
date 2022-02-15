import { Request, Response } from "express";
import { IBookId, IBookRatingDto } from "../dto/book.dto";
import { bookRatingService, likeBookService } from "../services/book.service";
import { getAllBooksRepo, getBookRepo, getFeaturedBooksRepo, searchBookRepo } from "../repository/book.repository";
import { badRequest, HttpStatusCode, notFound, okSuccess, serverError } from "../utils/response";
import { isPositive } from "class-validator";


export const fetchBooks = async (req: Request, res: Response) => {

    try {

        const page: number = parseInt(req.query.page as string) || 1;

        if(isNaN(page) || !isPositive(page)) 
            return badRequest(res, {}, "page must be a positive integer")

        const paginatedBooks = await getAllBooksRepo(page);

        return okSuccess(res, paginatedBooks);
        
    } catch (error) {
        
        return serverError(res);
    } 
}


export const fetchFeaturedBooks = async (req: Request, res: Response) => {

    try {

        const books = await getFeaturedBooksRepo()

        return okSuccess(res, books);
        
    } catch (error) {
        
        return serverError(res);
    }    
}


export const getBookDetails = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;

        const book = await getBookRepo(id);

        if(!book) return notFound(res)

        return okSuccess(res, book );
        
    } catch (error) {
        
        return serverError(res);
    }    
}


export const rateBook = async (req: Request, res: Response) => {

    try {

        const body: IBookRatingDto = req.body;

        const averageRating = await bookRatingService(body, req['user']);

        return okSuccess(res, {averageRating});
        
    } catch (error) {

        if(error.message === HttpStatusCode.NOT_FOUND.toString())
            return notFound(res);
        
        return serverError(res);
    }    
}


export const likeBook = async (req: Request, res: Response) => {

    try {

        const {bookId}: IBookId = req.body;

        const bookReactions = await likeBookService(bookId, req['user']);

        return okSuccess(res, {likeCount: bookReactions.length})
        
    } catch (error) {

        if(error.message === HttpStatusCode.NOT_FOUND.toString())
            return notFound(res);

        return serverError(res);
    }
}


export const searchBook = async (req: Request, res: Response) => {

    try {

        const searchQuery = req.query.q.toString() || '';

        const page: number = parseInt(req.query.page as string) || 1;

        if(isNaN(page) || !isPositive(page)) 
            return badRequest(res, {}, "page must be a positive integer")

        const searchedResults = await searchBookRepo(page, searchQuery);

        return okSuccess(res, searchedResults)

    } catch (error) {
        
        return serverError(res);
    }
}