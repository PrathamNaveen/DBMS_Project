// SidePanel.jsx
import React from "react";
import { Link } from "react-router-dom";

const SidePanel = () => {
  return (
    <div className="flex flex-col bg-gray-800 text-white p-4 py-32">
      <div className="mb-4">
        <Link to="/trending" className="block text-gray-300 hover:text-white mb-8">
          Trending Movies
        </Link>
        <Link to="/languages" className="block text-gray-300 hover:text-white mb-8">
          Languages
        </Link>
        <Link to="/genres" className="block text-gray-300 hover:text-white mb-8">
          Genres
        </Link>
        <Link to="/wheretowatch" className="block text-gray-300 hover:text-white mb-8">
          Where to Watch
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;
    