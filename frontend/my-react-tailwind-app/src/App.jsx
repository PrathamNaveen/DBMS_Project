import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <div className="bg-red-500 text-white p-4">
        {/* Logo */}
        <div className="flex-col items-center px-4">
          <span className="text-xl font-bold">Movie Database</span>
          <div className="ml-7 mt-2">
            <img
              src="../public/static/Logo.png"
              alt="Logo"
              className="h-24 w-24 mr-2 rounded-md"
            /> 
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-md mr-4 w-96 text-gray-500"
          />
          <button className="bg-white text-gray-500 px-4 py-2 rounded-md font-serif">
            <h3 className="text-lg">Search</h3>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="bg-gray-200 text-blue-600 flex flex-col items-center justify-center py-10 text-xl">
        <ul>
          {movies.map((movie) => (
            <li key={movie.MovieID}>
              <strong>Title:</strong> {movie.Title}
              <br />
              <strong>Rating:</strong> {movie.Rating}
              <br />
              <strong>Genre:</strong> {movie.GenreID}
              <br />
              <strong>Release Date:</strong> {movie.ReleaseDate}
              <br />
              <strong>Plot:</strong> {movie.Plot}
              <br />
              <strong>Director:</strong> {movie.DirectorID}
              <br />
              <strong>Cast:</strong> {movie.CastID}
              <br />
              <strong>Where to Watch ID:</strong> {movie.WtwID}
              <br />
              <strong>Movie Length:</strong> {movie.MovieLength}
              <br />
              <strong>Poster Link:</strong> {movie.PosterLink}
              <br />
              <strong>Language:</strong> {movie.Language}
              <br />
              <strong>Awards:</strong> {movie.Awards}
              <br />
              <strong>Popularity:</strong> {movie.Popularity}
              <br />
              <hr className="my-4"/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
