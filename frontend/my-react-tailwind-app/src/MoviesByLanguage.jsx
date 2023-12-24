// MoviesByLanguage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainContent from "./MainContent";

const MoviesByLanguage = () => {
  const { language } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByLanguage = async () => {
      try {
        const response = await axios.get(`/api/movies/language/${language}`);
        setMovies(response.data);
      } catch (error) {
        console.error(`Error fetching movies for ${language}:`, error);
      }
    };

    fetchMoviesByLanguage();
  }, [language]);

  return (
    <div className="flex-1 justify-center items-center overflow-y-auto p-4 py-32">
      <h2 className="text-2xl font-semibold mb-4 mx-auto my-auto">Movies in {language}</h2>
      <MainContent movies={movies} />
    </div>
  );
};

export default MoviesByLanguage;
