import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import User from '../models/User';
import bcrypt from 'bcrypt';

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ message: `Invalid Email or password ` })

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ user, message: `Invalid Email or password ` })

    res.send(true);
    // user = new User(_.pick(req.body, ['name', 'email', 'password', '_id']));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt); // hashed password

    // return user
    //     .save()
    //     .then((user) => res.status(200).json(_.pick(user, ['name', 'email', '_id'])))
    //     .catch((err) => res.status(500).json({ err }));
};

export default { authUser };