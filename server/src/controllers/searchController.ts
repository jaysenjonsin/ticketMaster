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
  const { userInput } = req.query;
  try {
    const { data } =
      await axios.get(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${process.env.TICKETMASTER_API_KEY}&keyword=
    ${userInput}`);

    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { location } = req.query;
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_API_KEY}`
    );

    if (!data.results[0]) {
      res.status(400);
      throw new Error('invalid location');
    }

    console.log('DATA: ', data);
    console.log('LOCATION: ', location);
    res.status(200).json({
      latitude: data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng,
    });
  } catch (err) {
    return next(err);
  }
};
