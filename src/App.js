import React from "react";
import Navigation from "../src/components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
