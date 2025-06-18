import "../App.css";

export const WeatherCard = ({
  icon,
  dayName,
  idx,
  wind,
  pressure,
  precipitation,
  temp,
}) => {
  if (idx === 0) {
    
    return (
      <div className="today-card">
        <div className="today-main">
          <div className="today-icon">{icon}</div>
          <div className="today-temp">{temp}</div>
        </div>
        <div className="today-details">
          <div>💨 Wind: {wind}</div>
          <div>🧭 Pressure: {pressure}</div>
          <div>🌧️ Precip: {precipitation}</div>
        </div>
        <div className="today-day">{dayName}</div>
      </div>
    );
  }

  return (
    <div className="weekday-card">
      <div className="weekday-day">{dayName}</div>
      <div className="weekday-icon">{icon}</div>
      <div className="weekday-temp">{temp}</div>
    </div>
  );
};