import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });

    return book
        .save()
        .then((book) => res.status(200).json({ book }))
        .catch((err) => res.status(500).json({ err }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .populate('author')
        .select('-__v') // this __v is going to be neglated by this line: .select('-__v')
        .then(book => book ? res.status(200).json({ book }) : res.status(404).json({
            message: "Not Found"
        }))
        .catch((err) => res.status(500).json({ err }));
};

const readAllBook = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .select('-__v') // this __v is going to be neglated by this line: .select('-__v')
        .then(books => res.status(200).json({ books }))
        .catch((err) => res.status(500).json({ err }))
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)

        .then(book => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(200).json({ book }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({
                    message: "Not Found"
                })
            }
        })
        .catch((err) => res.status(500).json({ err }));

};
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findByIdAndDelete(bookId)
        .then(book => book ? res.status(200).json({
            book, message: "this book is deleted"
        }) : res.status(404).json({
            message: "Not Found"
        }))
        .catch((err) => res.status(500).json({ err }));

};

export default { createBook, readBook, readAllBook, updateBook, deleteBook };