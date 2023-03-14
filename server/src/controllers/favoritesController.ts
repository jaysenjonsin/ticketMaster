import { Request, Response, NextFunction } from 'express';

export const getFavorites = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({message: 'hello from getFavorites'})
};
