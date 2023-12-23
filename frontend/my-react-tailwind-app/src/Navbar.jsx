// Navbar.jsx
import React from "react";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const Navbar = () => {
  // Define your props
  const onSearch = (results) => {
    // Handle search results if needed
    console.log("Search results:", results);
  };

  const handleMovieClick = (movie) => {
    // Handle movie click if needed
    console.log("Selected movie:", movie);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4">
      <div className="flex items-center justify-center">
        {/* Pass the props to the SearchBar component */}
        <SearchBar onSearch={onSearch} handleMovieClick={handleMovieClick} />
      </div>
    </div>
  );
};

export default Navbar;
