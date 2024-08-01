import { NextFunction, Response, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
export const asyncMiddleware = function (handler: (arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, arg1: Response<any, Record<string, any>>) => any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res)
        }
        catch (ex) {
            next(ex);
        }
    }
}