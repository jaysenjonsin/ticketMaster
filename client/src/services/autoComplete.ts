import axios from 'axios';

const API_URL = 'http://localhost:5000/search/';

const API_KEY: any = ''; //USE DOTENV FILE

// export const bleh = async (userFormInput: any) => {
//   const { data } = await axios.get(
//     `https://app.ticketmaster.com/discovery/v2/suggest?apikey=${API_KEY}&keyword=${userFormInput}`,
//     userFormInput
//   );
//   return data;
// };

export const autoComplete = async (userInput: string) => {
  const { data } = await axios.get(API_URL + 'autocomplete', {
    params: {
      userInput,
    },
  });
  return data._embedded;
};
