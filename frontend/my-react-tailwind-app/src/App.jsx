// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import MovieDetails from "./MovieDetails";
import MainContent from "./MainContent";
import Languages from "./Languages";
import Genres from "./Genres";
import MoviesByGenre from "./MoviesByGenre";
import WhereToWatch from "./WhereToWatch";
import MoviesByLanguage from "./MoviesByLanguage";
import MoviesByWTW from "./MoviesByWTW";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    // Fetch movies based on the selected language
    axios
      .get("/api/movies", {
        params: {
          language: selectedLanguage,
        },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [selectedLanguage]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleLanguageClick = (languageID) => {
    setSelectedLanguage(languageID);
  };

  const handleMovieSearch = (movieDetails) => {
    console.log("Handling movie search:", movieDetails);
    setSelectedMovie(movieDetails);
  };

  const handleWTWClick = (wtwName) => {
    setSelectedWTW(wtwName);
  };

  const handleSearchComplete = () => {
    // Reset the state when the search is complete
    setSelectedLanguage(null);
    setMovies([]);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Navbar */}
        <Navbar onMovieSearch={handleMovieSearch} />

        {/* Side Panel */}
        <SidePanel />

        {/* Main Content */}
        <Routes>
          <Route
            path="/movies"
            element={
              <MainContent
                movies={movies}
                handleMovieClick={handleMovieClick}
                selectedMovie={selectedMovie}
              />
            }
          />

          <Route path="/languages" element={<Languages handleLanguageClick={handleLanguageClick} />} />
          <Route
            path="/movies/:language"
            element={<MoviesByLanguage />}
          />

          <Route path="/genres" element={<Genres />} />
          <Route
            path="/genres/:genre" 
            element={<MoviesByGenre />}
          />

          <Route path="/wheretowatch" element={<WhereToWatch handleWTWClick={handleWTWClick} />} />
          <Route path="/movies/wtw/:wtwName" element={<MoviesByWTW />} />
        </Routes>

        {/* Detailed Movie Display */}
        {console.log("Selected Movie:", selectedMovie)}
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;