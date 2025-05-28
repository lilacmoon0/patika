import {useState, createContext } from "react"
import coordinates from "../data/coordinates.json"

const CityData = createContext();

export const CityDataProvider = ({children}) => {
  const [selectedCity, setSelectedCity] = useState(coordinates[0].name);

  return <CityData.Provider values={{selectedCity, setSelectedCity, coordinates}}>{children}</CityData.Provider>
}


export default CityData;