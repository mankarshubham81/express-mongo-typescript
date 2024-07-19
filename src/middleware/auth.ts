import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';
import { CustomJwtPayload } from '../types/express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');


    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as CustomJwtPayload;
        req.user = decoded;
        next();
    } catch (ex) {
        Logging.error(ex);
        res.status(400).send('Invalid token.');
    }
};

export default authMiddleware;