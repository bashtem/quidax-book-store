import { Cart } from "../entity/cart.entity"
import { getRepository } from "typeorm"
import { User } from "../entity/user.entity"
import { Book } from "src/entity/book.entity"


export const fetchCartByUserRepo = async (user: User): Promise<Cart[]> => {

    const carts = await getRepository(Cart).createQueryBuilder('cart')
    .leftJoinAndSelect("cart.book", "book")
    .where("cart.userId = :userId", {userId: user.id})
    .getMany()

    return carts;
}

export const findCartByUserAndBook = async (user: User, book: Book): Promise<Cart> => {

    const cart = await getRepository(Cart).findOne({where: {book, user}})

    return cart;
}

export const createCartRepo = async (book: Book, user: User, quantity: number) => {

    const cart = new Cart();

    cart.book = book;
    cart.user = user;
    cart.quantity = quantity;

    return await getRepository(Cart).save(cart);    
}

export const updateCartRepo = async (cart: Cart, quantity: number) => {

    cart.quantity = quantity;

    return await getRepository(Cart).save(cart);
}