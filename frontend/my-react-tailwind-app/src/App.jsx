// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import MovieDetails from "./MovieDetails";
import MainContent from "./MainContent"; // Import MainContent
import { BrowserRouter } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Side Panel */}
        <SidePanel />

        {/* Main Content */}
        <MainContent
          movies={movies}
          handleMovieClick={handleMovieClick}
          selectedMovie={selectedMovie}
        />

        {/* Detailed Movie Display */}
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
  