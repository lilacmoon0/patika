import WeatherApp from "./components/WeatherApp";
import { CityDataProvider } from "./context/CityData";
import { WeatherInfoProvider } from "./context/WeatherInfo";

function App() {
  return (
    <div className="App">
      <CityDataProvider>
        <WeatherInfoProvider>
          <WeatherApp />
        </WeatherInfoProvider>
      </CityDataProvider>
    </div>
  );
}

export default App;