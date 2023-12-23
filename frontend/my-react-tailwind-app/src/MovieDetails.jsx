import React from "react";

const MovieDetails = ({ movie, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
        <p>
          <strong>Rating:</strong> {movie.Rating}
        </p>
        <p>
          <strong>Genre:</strong> {movie.GenreID}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.ReleaseDate}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Director:</strong> {movie.DirectorID}
        </p>
        <p>
          <strong>Cast:</strong> {movie.CastID}
        </p>
        <p>
          <strong>Where to Watch ID:</strong> {movie.WtwID}
        </p>
        <p>
          <strong>Movie Length:</strong> {movie.MovieLength}
        </p>
        <p>
          <strong>Language:</strong> {movie.Language}
        </p>
        <p>
          <strong>Awards:</strong> {movie.Awards}
        </p>
        <p>
          <strong>Popularity:</strong> {movie.Popularity}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
