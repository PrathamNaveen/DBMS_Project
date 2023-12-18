import { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/styles.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('api/movies') // Specify the type for the response data
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

      <h2>Movies</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
