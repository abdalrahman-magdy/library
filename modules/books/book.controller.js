import { db } from "../../database/dbconnection.js";
import { Author } from "../../database/models/author.model.js";
import { Book } from "../../database/models/book.model.js"
import mongoose from "mongoose"

const addBook = async (req, res) => {
    try {
        let book = await Book.insertMany(req.body)
        
        

        const author = await Author.findByIdAndUpdate(req.body.author,{$push: {books:book[0]._id}},{new:true});

        console.log(author);
        
        book = await Book.findById(book[0]._id).populate('author','name -_id')
        res.status(201).json({ message: "success", book })
    } catch (error) {
        res.status(500).json({ message: "error adding book" })
        console.error(error);
    }
}

const getAllBooks = async (req, res) => {
    try {

        const title = req.query.title ? { title: new RegExp(req.query.title, 'i') } : {};
        const author = req.query.author ? { author: new RegExp(req.query.author, 'i') } : {};
        const query = { ...title, ...author };

        const books = await Book.find(query).populate('author','name -_id')

        res.status(201).json({ message: "success", books })

    } catch (error) {

        res.status(500).json({ message: "error fetching books" })
        console.error(error);
    }
}

const getBook = async (req, res) => {
    try {
        const book = await Book.findById( req.params.id ).populate('author','name -_id')
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(201).json({ message: "success", book })

    } catch (error) {
        res.status(500).json({ message: "error fetching book" })
        console.error(error);
    }
}

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id , req.body)
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(201).json({ message: "success", book })

    } catch (error) {
        res.status(500).json({ message: "error updating book" })
        console.error(error);
    }
}

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete( req.params.id )
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(201).json({ message: "success", book })

    } catch (error) {
        res.status(500).json({ message: "error deleting book" })
        console.error(error);
    }
}
export { addBook, getAllBooks, getBook, updateBook, deleteBook }