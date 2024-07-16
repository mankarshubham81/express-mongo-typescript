import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    const { name, email, password } = req.body;

    let duplicateUserEmailId = await User.findOne({ email: email })
    if (duplicateUserEmailId) return res.status(400).json({ duplicateUserEmailId, message: `this Email Id is alredy present user is already redistered` })

    const user = new User(_.pick(req.body, ['name', 'email', 'password', '_id']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); // hashed password

    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.toString() || '';
    const token = jwt.sign({ _id: user._id }, jwtPrivateKey);


    return user
        .save()
        .then((user) => res.header('x-auth-token', token).status(200).json(_.pick(user, ['name', 'email', '_id'])))
        .catch((err) => res.status(500).json({ err }));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then(user => user ? res.status(200).json({ user }) : res.status(404).json({ message: `Not Found` }))
        .catch((err) => res.status(500).json({ err }));
};

const readAllUser = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then(users => res.status(200).json({ users }))
        .catch((err) => res.status(500).json({ err }))
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then(user => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(200).json({ user }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: ` Not Found` })
            }
        })
        .catch((err) => res.status(500).json({ err }));

};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then(user => user ? res.status(200).json({ user, message: `this data is deleted` }) : res.status(404).json({ message: `Not Found` }))
        .catch((err) => res.status(500).json({ err }));

};

export default { createUser, readUser, readAllUser, updateUser, deleteUser };