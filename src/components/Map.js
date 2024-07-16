import React, { useState, useEffect } from "react";
import { countriesData } from "../data";

const Map = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    console.log("Selected countries changed:", selectedCountries);
  }, [selectedCountries]);

  const handlePathClick = (title) => {
    // Check if the country is already selected
    if (!selectedCountries.includes(title)) {
      // Update the selected countries array
      setSelectedCountries([...selectedCountries, title]);
    }
  };

  return (
    <div>
      <svg className="ag-canvas_svg" version="1.1" viewBox="0 0 1008 651">
        {countriesData.map((country) => (
          <path
            key={country.id}
            id={country.id}
            title={country.title}
            d={country.d}
            onClick={() => handlePathClick(country.title)}
            style={{
              cursor: "pointer",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default Map;
