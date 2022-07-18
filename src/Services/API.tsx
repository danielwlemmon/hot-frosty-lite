import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

const API = {
  getWeatherData: (lat:number, long: number) => {
   return( axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='
    + lat
    + '&lon=' + long
    + '&exclude=hourly,minutely,alerts&units=imperial&appid=58d0361f438e67f6c23c40e7d62a5c84')
  )},
  getLatLong: (zip:string) => {
    return fetch("https://api.myptv.com/geocoding/v1/locations/by-address?postalCode="
    + zip + "&countryFilter=US", {
      method: "GET",
      headers: { apiKey: "ZGRiZDc4YWI2N2I0NDZhNzk0MDZlNDAzNTJmOTZiZDY6NmJkZjNmZTAtMjc4Ny00Yzg2LWJlMTMtN2M5NDMxZjQwZGI1", "Content-Type": "application/json" },
  })
  .then(response => response.json())
  
  },
};

export default API;