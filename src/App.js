import React, { useState } from "react";
import "./App.css";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./favorites";
import img from "./image/badal2.jpg";  // Importing the image

const App = () => {
  const [city, setCity] = useState("");

  return (
    <div 
      className="main" 
      style={{ 
        backgroundImage: `url(${img})`,  // Correctly using the imported image
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '100vh'
      }}
    >
      <h1 className="heading">Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="sub">
        <WeatherDisplay city={city} />
        <Favorites />
      </div>
    </div>
  );
};

export default App;
