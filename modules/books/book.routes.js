import { Router } from "express";
import { addBook, deleteBook, getAllBooks, 
    getBook, updateBook } from "./book.controller.js";

const booksRouter = Router()

booksRouter.post('/add-book',addBook)
booksRouter.get('/get-all-books',getAllBooks)

booksRouter.route('/:id').get(getBook)
.patch(updateBook).delete(deleteBook)



export default booksRouter