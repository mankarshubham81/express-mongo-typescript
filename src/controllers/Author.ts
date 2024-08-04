import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import nodeCache from '../utils/cache/cache';


const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name
        });

        const savedAuthor = await author.save();
        if (savedAuthor) nodeCache.del("allAuthors");
        return res.status(200).json({ author: savedAuthor });

    } catch (err) {
        return res.status(500).json({ err });
    }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await Author.findById(authorId);
        return author ? res.status(200).json({ author }) : res.status(404).json({ message: "Author Not Found" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};


const readAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let authors;
        const cachedAuthors = nodeCache.get("allAuthors");
        if (nodeCache.has("allAuthors")) {
            authors = JSON.parse(cachedAuthors as string);
        } else {
            authors = await Author.find();
            nodeCache.set("allAuthors", JSON.stringify(authors));
        }
        return res.status(200).json({ authors });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await Author.findById(authorId);

        if (author) {
            author.set(req.body);
            const updatedAuthor = await author.save();
            nodeCache.del("allAuthors");
            return res.status(200).json({ author: updatedAuthor });
        } else {
            return res.status(404).json({ message: "Author Not Found" });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await Author.findByIdAndDelete(authorId);
        if (author) nodeCache.del("allAuthors");
        return author ? res.status(200).json({ author, message: "This data is deleted" }) : res.status(404).json({ message: "Author Not Found" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

export default { createAuthor, readAuthor, readAllAuthor, updateAuthor, deleteAuthor };
