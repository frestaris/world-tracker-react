import React from "react";
import Map from "./Map";
import Navigation from "./Navigation";
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
