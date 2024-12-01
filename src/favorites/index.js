import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [newCity, setNewCity] = useState("");

  // Fetch favorites from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:5000/favorites")
      .then((response) => setFavorites(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add a city to favorites
  const addFavorite = () => {
    if (newCity.trim()) {
      axios
        .post("http://localhost:5000/favorites", { name: newCity })
        .then((response) => {
          setFavorites([...favorites, response.data]);
          setNewCity("");
        })
        .catch((error) => console.error(error));
    }
  };

  // Remove a city from favorites
  const removeFavorite = (id) => {
    axios
      .delete(`http://localhost:5000/favorites/${id}`)
      .then(() => setFavorites(favorites.filter((city) => city.id !== id)))
      .catch((error) => console.error(error));
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
      <ul className="favorites-list">
        {favorites.map((city) => (
          <li key={city.id} className="favorite-item">
            {city.name}
            <button
              onClick={() => removeFavorite(city.id)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
