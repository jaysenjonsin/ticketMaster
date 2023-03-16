import { API_URL } from '../utils/constants';
import axios from 'axios';

const URL = API_URL + 'search/extraEventDetails';
export const getExtraEventDetails = async (id: string) => {
  const { data } = await axios.get(URL, {
    params: {
      id,
    },
  });
  console.log('DATA FROM GET X EVENT DETAILS: ', data);
  return data;
};
