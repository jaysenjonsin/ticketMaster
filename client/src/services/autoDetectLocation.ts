import axios from 'axios';
import { useState } from 'react';

// export const autoDetectLocation = () => {
//   const [lat, setLat] = useState('');
//   const [long, setLong] = useState('');

//         (autoDetectInfo) => {
//            console.log(autoDetectInfo);
//            var location = autoDetectInfo["loc"];
//            var autoLat = location.substring(0, location.indexOf(','));
//            var autoLong = location.substring(location.indexOf(',') + 1, location.length);
//            console.log(autoLat, autoLong);
//         }
//      )

//      const {data} = await axios.get(ipUrl);
//      setLat(location.substring(0, location.indexOf(','));)
//      setLong(location.substring(location.indexOf(',') + 1, location.length))
//   };

// const autoDetectLocation= () => {
//   const ipUrl = "https://ipinfo.io/?token=";
//   const autoDetect = () => {
//      Axios.get(ipUrl)
//      .then(
//         (response) => {
//            return response.data;
//         }
//      )
//      .then(
//         (autoDetectInfo) => {
//            console.log(autoDetectInfo);
//            var location = autoDetectInfo["loc"];
//            var autoLat = location.substring(0, location.indexOf(','));
//            var autoLong = location.substring(location.indexOf(',') + 1, location.length);
//            console.log(autoLat, autoLong);
//         }
//      )
//   };
