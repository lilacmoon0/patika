import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import CityData from "./CityData";

const WeatherInfo = createContext();

export const WeatherInfoProvider = ({ children }) => {
  const { selectedCity, coordinates } = useContext(CityData);
  const [url, setUrl] = useState(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weather_code,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours,sunrise,sunset&hourly=temperature_2m,precipitation,rain,snowfall,cloud_cover&models=jma_seamless&current=precipitation,temperature_2m,is_day,rain,showers,snowfall&timezone=auto"
  );
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const city = coordinates.find((item) => item.name === selectedCity);
    if (city) {
      const { lat, lng } = city;
      const newUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weather_code,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours,sunrise,sunset&hourly=temperature_2m,precipitation,rain,snowfall,cloud_cover&models=jma_seamless&current=precipitation,temperature_2m,is_day,rain,showers,snowfall&timezone=auto`;
      setUrl(newUrl);
    }
  }, [selectedCity, coordinates]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url);
        setInfo(response.data);
      } catch (error) {
        setInfo(null);
      }
    };
    fetchData();
  }, [url]);

  return (
    <WeatherInfo.Provider value={{ info }}>{children}</WeatherInfo.Provider>
  );
};

export default WeatherInfo;
