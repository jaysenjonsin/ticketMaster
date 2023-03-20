import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getSpotifyData = async () => {
  const { data } = await axios.get(API_URL + 'spotify', {
    params: {
      hello: 'hello',
    },
  });
  console.log('DATA FROM GETSPOTIFY: ', data);
  return data;
};
