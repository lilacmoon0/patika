import { useSelector, useDispatch } from "react-redux";
import { fetchData, setCountry } from "../redux/covidSlice";
import { fetchGlobalData } from "../redux/covidSlice";
import { Chart } from "./Chart";

export const Graphics = () => {
  const countryIso = useSelector((state) => state.covid.countryIso);
  const selectedCountry = useSelector((state) => state.covid.selectedCountry);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const selectedCountry = e.target.value;
    dispatch(setCountry(selectedCountry));
    dispatch(fetchData());
    if (selectedCountry === "") {
      dispatch(fetchGlobalData());
    }
  };

  return (
    <>
      <div className="dropdown-container">
        <select
          className="custom-select"
          value={selectedCountry ? selectedCountry : ""}
          onChange={handleChange}
        >
          <option value="">Global</option>
          {countryIso.map((country, index) => (
            <option key={index} value={country.iso}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="graphics">
        <Chart />
      </div>
    </>
  );
};
