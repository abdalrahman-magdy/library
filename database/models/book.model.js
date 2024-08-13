import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'Author', required: true },
    publishedDate: { type: Date, default: Date.now }
}, {
    versionKey: false
})

export const Book = model('Book', schema)