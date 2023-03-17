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

//if u want to pass in multiple query params, just use extra arguments:
// export const getLatAndLong = async (location: string, param1: string, param2: string) => {
//   const formattedLocation = location.split(' ').join('+');
//   const { data } = await axios.get(URL, {
//     params: {
//       location: formattedLocation,
//       param1: param1,
//       param2: param2
//     },
//   });
//   return data;
// };
