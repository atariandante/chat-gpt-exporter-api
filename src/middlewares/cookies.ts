import { Request, NextFunction, Response } from 'express';
import { COOKIES } from '../constants';

const cookiesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies && req.cookies[COOKIES.NOTION_ACCESS_TOKEN]) {
    //@ts-ignore
    req[COOKIES.NOTION_ACCESS_TOKEN] = req.cookies[COOKIES.NOTION_ACCESS_TOKEN];
  }

  next();
};

export default cookiesMiddleware;
