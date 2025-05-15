import "./color.module.css";
import { init, sendToBackend } from "./socketAPI.js";
import { useEffect, useState } from "react";
const Color = ({ activeColor }) => {
  useEffect(() => {
    init();
  }, []);
  const [color, setColor] = useState("#00000");

  return (
    <div className="color">
      <h1>{activeColor}</h1>
      <input
        value={activeColor}
        type="color"
        onChange={(e) => setColor(e.target.value)}
      ></input>
      <br></br>
      <button onClick={() => sendToBackend(color)}>Change</button>
    </div>
  );
};
export default Color;
