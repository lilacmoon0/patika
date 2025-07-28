// Import everything needed to use the `useQuery` hook
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Users } from "./pages/users";
import { Events } from "./pages/events";
import { Locations } from "./pages/locations";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}
