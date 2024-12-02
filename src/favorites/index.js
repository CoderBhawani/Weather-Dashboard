import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_KEY = "0890131f6c3631731e1f8794b712001d"; // Replace with your API key

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  // Fetch favorites from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:5000/favorites")
      .then((response) => {
        setFavorites(response.data);
        // Fetch weather for each city
        response.data.forEach((city) => fetchWeather(city.name, city.id));
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  // Fetch weather data for a city
  const fetchWeather = (cityName, cityId) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeatherData((prevData) => ({
          ...prevData,
          [cityId]: response.data,
        }));
      })
      .catch((error) => console.error(`Error fetching weather for ${cityName}:`, error));
  };

  // Add a city to favorites
  const addFavorite = () => {
    if (newCity.trim()) {
      axios
        .post("http://localhost:5000/favorites", { name: newCity })
        .then((response) => {
          setFavorites([...favorites, response.data]);
          setNewCity("");
          fetchWeather(newCity, response.data.id); // Fetch weather for the new city
        })
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  // Remove a city from favorites
  const removeFavorite = (id) => {
    axios
      .delete(`http://localhost:5000/favorites/${id}`)
      .then(() => {
        setFavorites(favorites.filter((city) => city.id !== id));
        setWeatherData((prevData) => {
          const newData = { ...prevData };
          delete newData[id];
          return newData;
        });
      })
      .catch((error) => console.error("Error removing favorite:", error));
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Cities</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Add a City"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="city-input"
        />
        <button onClick={addFavorite} className="add-button">
          Add
        </button>
      </div>
      {favorites.length === 0 ? (
        <p>No favorite cities added yet. Start adding some!</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((city) => (
            <li key={city.id} className="favorite-item">
              <div>
                <strong>{city.name}</strong>
                {weatherData[city.id] ? (
                  <p>
                    {weatherData[city.id].main.temp}°C -{" "}
                    {weatherData[city.id].weather[0].description}
                  </p>
                ) : (
                  <p>Loading weather...</p>
                )}
              </div>
              <button
                onClick={() => removeFavorite(city.id)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;

