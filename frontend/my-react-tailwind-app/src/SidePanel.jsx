import React from "react";

const SidePanel = () => {
  return (
    <div className="flex flex-col bg-gray-800 text-white p-4 py-32">
      <div className="mb-4">
        <a href="#" className="block text-gray-300 hover:text-white mb-8">
          Trending Movies
        </a>
        <a href="#" className="block text-gray-300 hover:text-white mb-8">
          Languages
        </a>
        <a href="#" className="block text-gray-300 hover:text-white mb-8">
          Genres
        </a>
        <a href="#" className="block text-gray-300 hover:text-white mb-8">
          Where to Watch
        </a>
      </div>
    </div>
  );
};

export default SidePanel;
