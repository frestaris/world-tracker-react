import React from "react";
import Countries from "./Countries";

const Map = () => {
  const handlePathClick = (title) => {
    console.log("Clicked country:", title);
  };

  return (
    <div>
      <Countries handlePathClick={handlePathClick} />
    </div>
  );
};

export default Map;
