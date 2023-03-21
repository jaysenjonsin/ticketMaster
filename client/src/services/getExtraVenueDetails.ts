import axios from 'axios';
import { API_URL } from '../utils/constants';
const URL = API_URL + 'search/extraVenueDetails';
export const getExtraVenueDetails = async (id: string) => {
  const { data } = await axios.get(URL, {
    params: {
      id,
    },
  });

  // console.log('DATA FROM X VENUE DETAILS: ', data);
  return data;
};
