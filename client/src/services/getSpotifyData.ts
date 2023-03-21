import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getSpotifyData = async (artistName: string) => {
  const { data } = await axios.get(API_URL + 'search/spotify', {
    params: {
      keyword: artistName,
    },
  });
  console.log('DATA FROM GETSPOTIFY: ', data);
  return data;
};
