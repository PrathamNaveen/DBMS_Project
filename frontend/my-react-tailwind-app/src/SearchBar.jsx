// SearchBar.jsx
import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch, handleMovieClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Convert the search term to lowercase
      const lowerCaseTerm = searchTerm.toLowerCase();

      // Make a request to search for the movie
      const response = await axios.get(`/api/movies/search/${lowerCaseTerm}`);

      // If movies are found, update the search results
      if (response.data) {
        setSearchResults(response.data);
        console.log(response.data);
      } else {
        // If no movies are found, you can handle it as per your requirement
        console.log("No movies found");
        setSearchResults([]);
      }

    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <div>
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
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.MovieID} onClick={() => handleMovieClick(movie)}>
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
