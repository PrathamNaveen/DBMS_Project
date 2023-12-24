// MoviesByWTW.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainContent from "./MainContent";

const MoviesByWTW = () => {
  const { wtwName } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByWTW = async () => {
      try {
        const response = await axios.get(`/api/movies/wtw/${wtwName}`);
        setMovies(response.data);
      } catch (error) {
        console.error(`Error fetching movies for ${wtwName}:`, error);
      }
    };

    fetchMoviesByWTW();
  }, [wtwName]);

  return (
    <div className="flex-1 justify-center items-center overflow-y-auto p-4 py-32">
      <h2 className="text-2xl font-semibold mb-4 mx-auto my-auto">Movies by {wtwName}</h2>
      <MainContent movies={movies} />
    </div>
  );
};

export default MoviesByWTW;
