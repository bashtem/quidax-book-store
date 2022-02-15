import { Book } from "../entity/book.entity";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import { BookReaction } from "../entity/book_reaction.entity";
import { IPaginate } from "src/interface/paginate.interface";


export const getAllBooksRepo = async (page: number): Promise<IPaginate<Book>> => {

    const perPage = 15;

    const bookBuilder = getRepository(Book).createQueryBuilder('books');

    const total = await bookBuilder.getCount();

    const lastPage = Math.ceil(total / perPage);

    const books = await bookBuilder.skip((perPage * page) - perPage).take(perPage).getMany();

    const results: IPaginate<Book> = {
        records: books,
        total,
        lastPage,
        page,
    }

    return results;
}


export const getFeaturedBooksRepo = async (): Promise<Book[]> => {

    const books = await getRepository(Book).createQueryBuilder('books').limit(20).getMany();

    return books;
}


export const getBookRepo = async (bookId: string): Promise<Book> => {

    const book = await getRepository(Book).findOne({where: {slug: bookId} });

    return book;
}


export const findBookReaction = async (book: Book, user: User) => {
    
    const bookReaction  = await getRepository(BookReaction).findOne({where: {book, user}});

    return bookReaction;
}


export const findBookReactionsByBook = async (book: Book) => {

    const bookReactions  = await getRepository(BookReaction).find({where: {book}});

    return bookReactions;
}


export const createBookReaction = async (book: Book, user: User) => {

    const bookReaction = new BookReaction();

    bookReaction.book = book;
    
    bookReaction.user = user;

    bookReaction.isLiked = true;

    return await getRepository(BookReaction).save(bookReaction);
}


export const removeBookReactionByBookAndUser = async (user: User, book: Book) => {

    await getRepository(BookReaction).delete({user, book})
}


export const searchBookRepo  = async (page: number, search?: string ): Promise<IPaginate<Book>> => {

    const perPage = 10;

    const searchedBooksBuilder = getRepository(Book).createQueryBuilder('books')
    .leftJoinAndSelect("books.bookGenres", "bookGenres")
    .leftJoinAndSelect("bookGenres.genre", "genre")
    .leftJoinAndSelect("books.bookTags", "bookTags")
    .leftJoinAndSelect("bookTags.tag", "tag")
    .where("books.title LIKE :query", {query: `%${search}%`})
    .orWhere("books.author LIKE :query", {query: `%${search}%`})
    .orWhere("genre.title LIKE :query", {query: `%${search}%`})
    .orWhere("tag.title LIKE :query", {query: `%${search}%`});

    const total = await searchedBooksBuilder.getCount();

    const records = await searchedBooksBuilder.skip((perPage * page) - perPage).take(perPage).getMany();

    const lastPage =  Math.ceil(total / perPage);
    
    const results: IPaginate<Book> = {
        records,
        total,
        lastPage,
        page
    }

    return results;
}
