import axios from 'axios';
import { API_URL } from '../utils/constants';
export const getExtraVenueDetails = async (id: string) => {
  const { data } = await axios.get(API_URL + 'extra-venue-details', {
    params: {
      id,
    },
  });

  console.log('DATA FROM X VENUE DETAILS: ', data);
  return data;
};
