import express from 'express'
import booksRouter from './modules/books/book.routes.js'
import  "./database/dbconnection.js";
import authorsRouter from './modules/authors/author.routes.js';

const app = express()
const port = 3000

app.use(express.json())

app.use('/books',booksRouter)
app.use('/authors',authorsRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 