// SearchBar.jsx
import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onMovieSearch, onSearchComplete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const response = await axios.get(`/api/movies/search/${lowerCaseTerm}`);

      if (response.data) {
        setSearchResults(response.data);
        // console.log(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  const handleSelectMovie = (selectedMovie) => {
    // Directly pass the selected movie details to the parent
    console.log("Selected Movie from Search bar:", selectedMovie);
    onMovieSearch(selectedMovie);
    onSearchComplete();
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Search for a movie"
        className="px-4 py-2 border rounded-md mr-4 w-96 text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-white text-black px-4 py-2 rounded-md font-serif"
      >
        <h3 className="text-lg">Search</h3>
      </button>

      {/* Render search results with click handling */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((movie) => (
              <li
                key={movie.MovieID}
                onMouseDown={() => handleSelectMovie(movie)}
              >
                {movie.Title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

