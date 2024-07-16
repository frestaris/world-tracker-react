import React from "react";
import Map from "../src/components/Map";
import Navigation from "../src/components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Map />
      </Router>
    </div>
  );
}

export default App;
