import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"

const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit--,,
  const [storedCity, setStoredCity] = useState(localStorage.getItem("lastCity") || "");

  useEffect(() => {
    const API_KEY = "0890131f6c3631731e1f8794b712001d";

    const fetchWeather = (selectedCity) => {
      // Fetch current weather--,,
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=${unit}`
        )
        .then((response) => setWeather(response.data))
        .catch((error) => console.error(error));

      // Fetch 5-day forecast--,,
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=${unit}`
        )
        .then((response) => {
          // Filter forecast to show only one entry per day (e.g., 12:00 PM)--vaise ye multipal hain lekin filter se humne one by one nikali hain
          const filteredForecast = response.data.list.filter((entry) =>
            entry.dt_txt.includes("12:00:00")
          );
          setForecast(filteredForecast);
        })
        .catch((error) => console.error(error));
    };

    const activeCity = city || storedCity;
    if (activeCity) {
      fetchWeather(activeCity);

      // Save the last searched city to LocalStorage---
      localStorage.setItem("lastCity", activeCity);
    }
  }, [city, unit, storedCity]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="weather-container">
      {weather && (
        <div className="current-weather">
          <h2>Current Weather in {weather.name}</h2>
          <p>
            Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}
          </p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      <button onClick={toggleUnit} className="btnnn">
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
  
      <h2 className="day">5-Day Forecast</h2>
      <ul className="forecast-list">
        {forecast.map((day, index) => (
          <li key={index} className="listname">
            {new Date(day.dt_txt).toLocaleDateString()} - {day.main.temp}°{unit === "metric" ? "C" : "F"}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default WeatherDisplay;  

