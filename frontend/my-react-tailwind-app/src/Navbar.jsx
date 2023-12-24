// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "/static/logo.jpg"; 
import HomeIcon from "/static/home-icon.svg"; 

const Navbar = ({ onMovieSearch }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/movies");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo and App Name on the left side */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 mr-4" />
          <span className="text-xl font-bold">MOVIE DATABASE</span>
        </div>

        <SearchBar onMovieSearch={onMovieSearch} />
        {/* Home Button */}
        <div className="px-8">
          <button
            onClick={handleHomeClick}
            className="flex items-center text-white cursor-pointer"
          >
            <img src={HomeIcon} alt="Home Icon" className="h-6 mr-2" />
            <span className="text-lg font-semibold">Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
