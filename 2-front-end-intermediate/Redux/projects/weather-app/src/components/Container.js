import { useSelector, useDispatch } from "react-redux";
import { setCity, fetchForecast } from "../redux/slices/forecast";
import { useEffect } from "react";
import { Card } from "./Card";

export const Container = () => {
  const coordinates = useSelector((state) => state.forecast.coordinates);
  const selectedCity = useSelector((state) => state.forecast.selectedCity);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const city = e.target.value;
    dispatch(setCity(city));
  };

  useEffect(() => {
    dispatch(fetchForecast());
  }, [selectedCity]);

  return (
    <div className="container mx-auto px-4">
      <select
        className="dropdown-menu"
        value={selectedCity ? selectedCity : ""}
        onChange={handleChange}
      >
        {coordinates.map((city, index) => {
          return (
            <option value={city.name} key={index}>
              {city.name}
            </option>
          );
        })}
      </select>

      <Card />
    </div>
  );
};
