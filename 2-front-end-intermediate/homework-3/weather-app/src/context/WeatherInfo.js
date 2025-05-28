import {useContext, createContext } from "react"
import axios from "axios";
import CityData from "./CityData";

const WeatherInfo = createContext();
 
export const WeatherInfoProvider = ({children}) => {  
  const {selectedCity, coordinates} = useContext(CityData);
  const {lat, lng} = coordinates.find(item => item.name === selectedCity);
 let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weather_code,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours,sunrise,sunset&hourly=temperature_2m,precipitation,rain,snowfall,cloud_cover&models=jma_seamless&current=precipitation,temperature_2m,is_day,rain,showers,snowfall&timezone=auto`
 let info;
 (async ()=> {   
  info = await axios(url);
 })();

 console.log(info.data)
 

  return <WeatherInfo.Provider value={info}>{children}</WeatherInfo.Provider>
}


export default WeatherInfo;