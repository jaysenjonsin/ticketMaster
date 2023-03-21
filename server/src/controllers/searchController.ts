import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { spotifyApi } from '../utils/createSpotifyAPI';

export const searchEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userInput: { keyword, distance, category, latitude, longitude },
  }: any = req.query;
  try {
    if (!keyword || !category || !latitude || !longitude) {
      res.status(400);
      throw new Error('Please enter all required fields');
    }
    let ticketMaster_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&keyword=${keyword}&unit=miles&segmentId=${category}&geoPoint=${latitude},${longitude}`;

    if (distance) {
      if (!Number(distance)) {
        res.status(400);
        throw new Error('Please enter a valid number for distance(in miles');
      } else ticketMaster_URL += `&radius=${distance}`;
    }

    const { data } = await axios.get(ticketMaster_URL);
    if (!data._embedded) {
      res.status(400);
      throw new Error('No events found');
    }
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
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

export const getExtraEventDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  try {
    const { data } = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${process.env.TICKETMASTER_API_KEY}`
    );
    res.status(200).json(data);
  } catch (err: any) {
    return next(err);
  }
};

export const getExtraVenueDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  try {
    const { data } = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues.json?id=${id}&apikey=${process.env.TICKETMASTER_API_KEY}`
    );
    res.status(200).json(data);
  } catch (err: any) {
    return next(err);
  }
};

export const getSpotifyData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { keyword } = req.query;
    //@ts-ignore
    const { body } = await spotifyApi.searchArtists(keyword);
    res.status(200).json(body);
  } catch (err: any) {
    return next(err);
  }
};
