import Weather from "./Weather";
import { useContext } from "react";
import CityData from "../context/CityData";
import "./Weather.css";

const WeatherApp = () => {
  const { selectedCity, setSelectedCity, coordinates } = useContext(CityData);

  return (
    <div>
      <div className="select-bar">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {coordinates.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <h2 className="header">Weekly Forecast</h2>
      <div className="weather-forecast">
        <Weather></Weather>
      </div>
    </div>
  );
};

export default WeatherApp;