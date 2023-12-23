// Genres.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("/api/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="m-4 p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Genres</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.GenreID} className="mb-2">
            {genre.GenreName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
