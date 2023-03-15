import axios from 'axios';
import { API_URL } from '../utils/constants';

const URL = API_URL + 'search/getlocation';

export const getLatAndLong = async (location: string) => {
  console.log(URL);
  const formattedLocation = location.split(' ').join('+');
  const { data } = await axios.get(URL, {
    params: {
      location: formattedLocation,
    },
  });
  return data;
};
