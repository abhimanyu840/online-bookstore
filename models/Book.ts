import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
});

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);

export default Book;
