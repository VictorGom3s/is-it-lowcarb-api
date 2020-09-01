import { Request, Response, NextFunction } from 'express';

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  /* Check if the token needs refreshing and refresh it*/
  next();
};
