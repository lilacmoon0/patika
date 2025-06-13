import { useContext } from "react";
import WeatherInfo from "../context/WeatherInfo";
import weatherIconsMap from "../data/weatherIconsMap.json";

// Simple emoji map for demonstration
const emojiMap = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "mainly-clear-day": "🌤️",
  "mainly-clear-night": "🌤️",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "☁️",
  "overcast-day": "☁️",
  "overcast-night": "☁️",
  "fog-day": "🌫️",
  "fog-night": "🌫️",
  "partly-cloudy-day-drizzle": "🌦️",
  "partly-cloudy-night-drizzle": "🌦️",
  drizzle: "🌧️",
  "partly-cloudy-day-rain": "🌦️",
  "partly-cloudy-night-rain": "🌧️",
  rain: "🌧️",
  "partly-cloudy-day-snow": "🌨️",
  "partly-cloudy-night-snow": "🌨️",
  snow: "❄️",
  "thunderstorms-day": "⛈️",
  "thunderstorms-night": "⛈️",
  "thunderstorms-day-rain": "⛈️",
  "thunderstorms-night-rain": "⛈️",
};

const Weather = () => {
  const { info } = useContext(WeatherInfo);

  if (!info || !info.daily) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="weather-forecast-list">
        {info.daily.time.map((date, idx) => {
          const code = info.daily.weather_code[idx];
          const iconKey = weatherIconsMap[code]?.day || "clear-day";
          const icon = emojiMap[iconKey] || "❔";
          const dayName = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <li
              key={date}
              className={`weather-card${idx === 0 ? " focus" : ""}`}
            >
              <span className="weather-icon">{icon}</span>
              <div className="day-name">{dayName}</div>
              <div className="temp-max">
                Max: {info.daily.temperature_2m_max[idx]}°C
              </div>
              <div className="temp-min">
                Min: {info.daily.temperature_2m_min[idx]}°C
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Weather;
