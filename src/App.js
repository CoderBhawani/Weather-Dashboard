import React, { useState } from "react";

import "./App.css"
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./favorites";

const App = () => {
  const [city, setCity] = useState("");

  return (
    <div class="main">
      <h1 className="heading">Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="sub">
      <WeatherDisplay city={city} />
      <Favorites/>
      </div>
     
    </div>
  );
};

export default App;
