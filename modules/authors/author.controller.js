import { Author } from "../../database/models/author.model.js";

const addAuthor = async (req, res) => {
    try {

        const author = await Author.insertMany(req.body)

        res.status(201).json({ message: "success",  author })
    } catch (error) {
        res.status(500).json({ message: "error adding author" })
        console.error(error);
    }
}

const getAllAuthors = async (req, res) => {
    try {
        const name = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
        const bio = req.query.bio ? { bio: new RegExp(req.query.bio, 'i') } : {};
        const query = { ...name, ...bio };
        const authors = await Author.find(query).populate("books","title  -_id")

        res.status(201).json({ message: "success", authors })

    } catch (error) {

        res.status(500).json({ message: "error fetching authors" })
        console.error(error);
    }
}

const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById( req.params.id ).populate('books',"title publishedDate -_id");
        if (!author) {
            return res.status(404).json({ error: 'author not found' })
        }
        res.status(201).json({ message: "success",  author })

    } catch (error) {
        res.status(500).json({ message: "error fetching book" })
        console.error(error);
    }
} 

const updateAuthorById = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id , req.body)
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(201).json({ message: "success", author })

    } catch (error) {
        res.status(500).json({ message: "error updating author" })
        console.error(error);
    }
}

const deleteAuthorById = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete( req.params.id )
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(201).json({ message: "success",  author })

    } catch (error) {
        res.status(500).json({ message: "error deleting author" })
        console.error(error);
    }
}
export{ addAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById}