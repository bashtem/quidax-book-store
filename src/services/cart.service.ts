import { ICartDto } from "../dto/cart.dto";
import { getBookRepo } from "../repository/book.repository";
import { User } from "../entity/user.entity"
import { createCartRepo, fetchCartByUserRepo, findCartByUserAndBook, updateCartRepo } from "../repository/cart.repository"
import { HttpStatusCode } from "../utils/response";
import { Cart } from "src/entity/cart.entity";

export const cartWithSubTotalService = async (user: User) => {

    const carts = await fetchCartByUserRepo(user);

    let subTotal = 0;

    carts.forEach(cart => {
        subTotal+= cart.quantity * cart.book.price;
    })

    return {subTotal, carts};
}

export const createOrUpdateCartService = async (body: ICartDto, user: User) => {

    let cartUpdate: Cart;

    const book = await getBookRepo(body.bookId);

    if(!book) throw new Error(HttpStatusCode.NOT_FOUND.toString());

    if(book.quantity < body.quantity) throw new Error(HttpStatusCode.BAD_REQUEST.toString());

    const cart = await findCartByUserAndBook(user, book);

    if(cart)
        cartUpdate = await updateCartRepo(cart, body.quantity);
    else
        cartUpdate = await createCartRepo(book, user, body.quantity);

    return cartUpdate;
}