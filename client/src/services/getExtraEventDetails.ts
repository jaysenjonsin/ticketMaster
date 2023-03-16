import { API_URL } from '../utils/constants';
import axios from 'axios';

export const getExtraEventDetails = async (id: string) => {
  const { data } = await axios.get(API_URL + 'extra+event+details', {
    params: {
      id,
    },
  });
  console.log('DATA FROM GET X EVENT DETAILS: ', data);
  return data;
};
