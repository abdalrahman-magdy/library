import { Router } from "express";
import { addAuthor, deleteAuthorById, getAllAuthors, getAuthorById, updateAuthorById } from "./author.controller.js";

const authorsRouter = Router()

authorsRouter.post('/add-author',addAuthor)
authorsRouter.get("/get-all-authors",getAllAuthors)
authorsRouter.route("/:id").get(getAuthorById)
.patch(updateAuthorById).delete(deleteAuthorById)



export default authorsRouter