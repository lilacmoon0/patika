import WeatherApp from "./components/WeatherApp";
import CityData from "./context/CityData";
import WeatherInfo from "./context/WeatherInfo";


function App() {
  return (
    <div className="App">
      <WeatherInfo.Provider>
        <CityData.Provider>
          <WeatherApp>
            
          </WeatherApp>
        </CityData.Provider>
      </WeatherInfo.Provider>
    </div>
  );
}

export default App;
