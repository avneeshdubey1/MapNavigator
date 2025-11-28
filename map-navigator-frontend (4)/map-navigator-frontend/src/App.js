import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import UserHistory from "./pages/UserHistory";
import AV from "./pages/AvailableLocations";
import Navbar from "./components/Navbar"; // Import Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* Display Navbar on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/AvailableLocations" element={<AV />} />
      </Routes>
    </Router>
  );
}


export default App;
