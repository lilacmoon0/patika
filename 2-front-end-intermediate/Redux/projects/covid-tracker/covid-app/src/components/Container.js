import { Cards } from "./Cards";
import { Graphics } from "./Graphics";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGlobalData } from "../redux/covidSlice";

export const Container = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.covid.status);

  useEffect(() => {
    dispatch(fetchGlobalData());
  }, [dispatch]);
  return (
    <>
      {loading === "succeeded" ? (
        <div className="container">
          <Cards />
          <Graphics />
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};
