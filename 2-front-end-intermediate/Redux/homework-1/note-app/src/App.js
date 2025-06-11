import "./App.css";

import { NotesList } from "./components/NotesList";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <NotesList>
        </NotesList>
      </Provider>
    </div>
  );
}

export default App;
