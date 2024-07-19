import { NextFunction, Response, Request } from 'express';
import _ from 'lodash';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

const authu = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: `Access denied. No token provided` });


    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.toString() || '';
    try {

        const decoded = jwt.verify(token, jwtPrivateKey);
        // req.user = decoded;
        next();
    }
    catch (er) {
        res.status(400).send(`Invalid Token.`)
    }

}

// const authUser = async (req: Request, res: Response, next: NextFunction) => {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email: email })
//     if (!user) return res.status(400).json({ message: `Invalid Email or password ` })

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json({ user, message: `Invalid Email or password ` })

//     // const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.toString() || '';

//     // const token = jwt.sign({ _id: user._id }, jwtPrivateKey);

//     const token = user.generateAuthToken();

//     res.send(token);
//     // user = new User(_.pick(req.body, ['name', 'email', 'password', '_id']));
//     // const salt = await bcrypt.genSalt(10);
//     // user.password = await bcrypt.hash(user.password, salt); // hashed password

//     // return user
//     //     .save()
//     //     .then((user) => res.status(200).json(_.pick(user, ['name', 'email', '_id'])))
//     //     .catch((err) => res.status(500).json({ err }));
// };

export default { authu };