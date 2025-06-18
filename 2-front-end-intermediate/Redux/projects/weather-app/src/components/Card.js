import { useSelector } from "react-redux";
import { WeatherCard } from "./WeatherCard";
import "../App.css";

export const Card = () => {
  const data = useSelector((state) => state.forecast.data);
  const emojiMap = useSelector((state) => state.forecast.emojiMap);
  const weatherIconsMap = useSelector((state) => state.forecast.weatherIcons);
  const selectedCity = useSelector((state) => state.forecast.selectedCity);

  if (!data) {
    return (
      <>
        <br />
        <h1>"LOADING..."</h1>
      </>
    );
  }

  const todayIdx = 0;
  const todayProps = {
    icon:
      emojiMap[weatherIconsMap[data.daily.weather_code[todayIdx]]?.day] || "❔",
    dayName: new Date(data.daily.time[todayIdx]).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    idx: todayIdx,
    temp:
      (
        (data.daily.temperature_2m_max[todayIdx] +
          data.daily.temperature_2m_min[todayIdx]) /
        2
      ).toFixed(1) + "°C",
    wind: data.daily.wind_speed_10m_max
      ? data.daily.wind_speed_10m_max[todayIdx] + " m/s"
      : "-",
    pressure: data.daily.pressure_msl_max
      ? data.daily.pressure_msl_max[todayIdx] + " hPa"
      : "-",
    precipitation: data.daily.precipitation_sum
      ? data.daily.precipitation_sum[todayIdx] + " mm"
      : "-",
  };

  const weekCards = data.daily.time.slice(1).map((date, idx) => {
    const i = idx + 1;
    return (
      <WeatherCard
        key={i}
        icon={
          emojiMap[weatherIconsMap[data.daily.weather_code[i]]?.day] || "❔"
        }
        dayName={new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        })}
        idx={i}
        temp={
          (
            (data.daily.temperature_2m_max[i] +
              data.daily.temperature_2m_min[i]) /
            2
          ).toFixed(1) + "°C"
        }
        wind={
          data.daily.wind_speed_10m_max
            ? data.daily.wind_speed_10m_max[i] + " m/s"
            : "-"
        }
        pressure={
          data.daily.pressure_msl_max
            ? data.daily.pressure_msl_max[i] + " hPa"
            : "-"
        }
        precipitation={
          data.daily.precipitation_sum
            ? data.daily.precipitation_sum[i] + " mm"
            : "-"
        }
      />
    );
  });

  return (
    <div className="weather-card-container">
      <h2 className="city-title">{selectedCity}</h2>
      <div className="today-section">
        <WeatherCard {...todayProps} />
      </div>
      <div className="weekdays-section">{weekCards}</div>
    </div>
  );
};
