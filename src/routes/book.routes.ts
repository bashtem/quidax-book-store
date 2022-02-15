import * as express from 'express';
import { validateBookLike, validateBookRating } from '../middlewares/book.middleware';
import { fetchBooks, fetchFeaturedBooks, getBookDetails, likeBook, rateBook, searchBook } from '../controllers/book.controller';

const router = express.Router();

router.get('/', fetchBooks)

router.get('/featured', fetchFeaturedBooks)

router.put('/rating', [validateBookRating], rateBook)

router.post('/likes', [validateBookLike], likeBook)

router.get('/search', searchBook)

router.get('/:id', getBookDetails)

export default router;