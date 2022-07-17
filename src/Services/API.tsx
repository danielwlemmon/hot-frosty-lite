import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

const API = {
  getWeatherData: (lat:number, long: number) => {
   return( axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='
    + lat
    + '&lon=' + long
    + '&exclude=hourly,minutely,alerts&units=imperial&appid=58d0361f438e67f6c23c40e7d62a5c84')
  )},
  getLatLong: (zip:string) => {
    return axios.get('http://api.positionstack.com/v1/forward?access_key=3f10f040b0272fd0c5f95ea64844da9e&query='
    + zip );
  },
};

export default API;