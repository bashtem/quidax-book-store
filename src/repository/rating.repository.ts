import { Book } from "../entity/book.entity";
import { getRepository } from "typeorm";
import { Rating } from "../entity/rating.entity";
import { User } from "../entity/user.entity";


export const createRatingRepo = async (book: Book, user: User, rate: number): Promise<Rating> => {

    const rating = new Rating();

    rating.book = book;

    rating.user = user;
    
    rating.rating = rate;

    return await getRepository(Rating).save(rating);
}

export const findAllRatingByBook = async (book: Book): Promise<Rating[]> => {

    const bookRatings = await getRepository(Rating).find({where: {book}})

    return bookRatings;
}

export const updateRatingRepo = async (rating: Rating, rate: number): Promise<Rating>  => {

    rating.rating = rate;

    return await getRepository(Rating).save(rating);
}

export const findOneRatingByBookAndUser = async (book: Book, user: User): Promise<Rating> => {

    const bookRating = await getRepository(Rating).findOne({where: {book, user}});

    return bookRating;
}
