import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export const searchEvent = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ message: 'hello from search event' });
};

export const autoComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userInput } = req.body;

  try {
    const { data } =
      await axios(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${APIKEYHERE}&keyword=
    ${userInput}`);

    res.status(200).json({ data });
  } catch (err) {
    return next(err);
  }
};
