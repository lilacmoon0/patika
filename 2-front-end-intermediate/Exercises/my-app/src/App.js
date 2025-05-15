// import ContactsApp from "./Components/ContactsApp";
import { useEffect, useState } from "react";
import "./App.css";
import Color from "./Components/Color/color";
import { init, subscribe } from "./Components/Color/socketAPI.js";

function App() {
  const [activeColor, setActiveColor] = useState("");
  useEffect(() => {
    init();
    subscribe((color) => {
      setActiveColor(color);
    });
  }, []);
  return (
    <div className="App" style={{ backgroundColor: activeColor }}>
      {/* <ContactsApp></ContactsApp> */}
      <Color activeColor={activeColor}></Color>
    </div>
  );
}

export default App;
