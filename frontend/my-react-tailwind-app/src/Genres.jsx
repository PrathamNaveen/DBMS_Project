// Genres.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="flex justify-center items-center h-screen">
      <div className="m-4 p-4 border border-gray-300 rounded text-center">
        <h2 className="text-lg font-semibold mb-4">Genres</h2>
        <ul>
          {genres.map((genre) => (
            <li
              key={genre.GenreID}
              className="mb-2 cursor-pointer hover:underline"
            >
              <Link to={`/genres/${genre.GenreName}`}>
                {genre.GenreName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Genres;
