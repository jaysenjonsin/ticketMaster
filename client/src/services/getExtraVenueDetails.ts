import axios from 'axios';
import { API_URL } from '../utils/constants';
const URL = API_URL + 'search/extraVenueDetails';
export const getExtraVenueDetails = async (name: string) => {
  const { data } = await axios.get(URL, {
    params: {
      name,
    },
  });

  return data;
};
