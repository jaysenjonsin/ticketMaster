import axios from 'axios';
import { API_URL } from '../utils/constants';

const URL = API_URL + 'search/autocomplete';

// const API_URL = 'http://localhost:5000/search/';

export const autoComplete = async (userInput: string) => {
  const { data } = await axios.get(URL, {
    params: {
      userInput,
    },
  });
  console.log('DATA FROM AUTOCOMPLETE: ', data);
  return data._embedded;
};
