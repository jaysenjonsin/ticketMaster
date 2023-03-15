import axios from 'axios';
import { API_URL } from '../utils/constants';
const URL = API_URL + 'search';

export const searchEvent = async (userInput: any) => {
  const { data } = await axios.get(URL, {
    params: {
      userInput,
    },
  });

  console.log('USER INPUT: ', userInput);
  return data;
};
