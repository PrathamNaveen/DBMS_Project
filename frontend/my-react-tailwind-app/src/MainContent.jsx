// MainContent.jsx
import React from "react";

const MainContent = ({ movies, handleMovieClick, selectedMovie }) => {
  return (
    <div className="flex-1 overflow-auto grid grid-cols-4 gap-4 p-4 py-36">
      {movies.map((movie) => (
        <div
          key={movie.MovieID}
          className="flex flex-col items-center mb-4 cursor-pointer"
          onClick={() => handleMovieClick(movie)}
        >
          <img
            src={movie.PosterLink}
            alt={movie.Title}
            className="cursor-pointer h-32 w-24 object-cover mb-2 border rounded-md border-gray-500"
          />
          <p className="text-center">{movie.Title}</p>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
