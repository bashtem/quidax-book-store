import { User } from "../entity/user.entity";
import { IBookRatingDto } from "../dto/book.dto";
import { createBookReaction, findBookReaction, findBookReactionsByBook, getBookRepo, removeBookReactionByBookAndUser } from "../repository/book.repository"
import { createRatingRepo, findAllRatingByBook, findOneRatingByBookAndUser, updateRatingRepo } from "../repository/rating.repository";
import { HttpStatusCode } from "../utils/response";
import { BookReaction } from "src/entity/book_reaction.entity";


export const bookRatingService = async (body: IBookRatingDto, user: User): Promise<number> => {

    const book = await getBookRepo(body.bookId);

    if(!book) throw new Error(HttpStatusCode.NOT_FOUND.toString());

    const bookRating = await findOneRatingByBookAndUser(book, user);

    if(bookRating)    
        await updateRatingRepo(bookRating, body.rating);
    
    else
        await createRatingRepo(book, user, body.rating);

    const bookRatings = await findAllRatingByBook(book);

    if(!bookRatings.length) return 0;

    let totalRating = 0

    bookRatings.forEach(eachRating => {
        totalRating+= eachRating.rating
    })

    const averageBookRating = Math.ceil(totalRating / bookRatings.length);

    return averageBookRating;    
}


export const likeBookService = async (bookId: string, user: User): Promise<BookReaction[]> => {

    const book = await getBookRepo(bookId);

    if(!book) throw new Error(HttpStatusCode.NOT_FOUND.toString());

    const bookReaction = await findBookReaction(book, user);

    if(bookReaction){

        await removeBookReactionByBookAndUser(user, book);

        const bookReactions = await findBookReactionsByBook(book);
        
        return bookReactions;
    }

    await createBookReaction(book, user);

    const bookReactions = await findBookReactionsByBook(book);
        
    return bookReactions;
}