// Navbar.jsx
import React from "react";
import SearchBar from "./SearchBar";

const Navbar = ({ onMovieSearch }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4">
      <div className="flex items-center justify-center">
        {/* Pass the onMovieSearch function to the SearchBar component */}
        <SearchBar onMovieSearch={onMovieSearch} />
      </div>
    </div>
  );
};

export default Navbar;
