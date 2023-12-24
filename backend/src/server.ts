// Main Backend code using Node and Express

import express from 'express';
import dotenv from 'dotenv';
import * as db from './databases/database.js';

dotenv.config();

const app = express();
const port = 3000;

//Home page
app.get('/', (req, res) => {
    return res.status(200).send("Home page working");
});

// Get all Movies
app.get('/api/movies', async (req, res) => {
    try{
        const allMovies = await db.getMovies();
        allMovies.forEach((movie)=> {
            console.log(movie);
        });

        res.status(200).json(allMovies);
    } catch (error) {
        console.error("Error fetching movies", error);
        res.status(500).json({ error: "Error fetching movies" });
    }
});

// Movie by specific ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const allMovies = await db.getMovieById(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error getting movie Id", error);
        res.status(500).json({ error: "No movie by that id" });
    }
});

// Director of a specific movie
app.get('/api/director/:id', async (req, res) => {
    try {
        const allMovies = await db.getDirectorOfSpecificMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching director id", error);
        res.status(500).json({ error: "No director by such id" });
    }
});

// Get Genre of specific movie
app.get('/api/genre/:id', async (req, res) => {
    try {
        const allMovies = await db.getGenreOfSpecificMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching genre id", error);
        res.status(500).json({ error: "No genre by such id" });
    }
});

// Get All available Genres
app.get('/api/genres', async (req, res) => {
    try {
      const allGenres = await db.getAllGenres();
      res.status(200).json(allGenres);
    } catch (error) {
      console.error("Error fetching all genres", error);
      res.status(500).json({ error: "Error fetching all genres" });
    }
});

app.get('/api/movies/genre/:genre', async (req, res) => {
    try {
      const genre = req.params.genre;
      const movies = await db.getMoviesByGenre(genre);
  
      res.status(200).json(movies);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      res.status(500).json({ error: "Error fetching movies by genre" });
    }
});

// Get Cast of specific movie
app.get('/api/cast/:id', async (req, res) => {
    try {
        const allMovies = await db.getCastOfSpecificMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching cast id", error);
        res.status(500).json({ error: "No cast by such id" });
    }
});

// Get the where to watch location for a specific movie
app.get('/api/wtw/:id', async (req, res) => {
    try {
        const allMovies = await db.getWhereToWatch(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching where to watch id", error);
        res.status(500).json({ error: "No where to watch by such id" });
    }
});

// Get all the where to watch locations for all movies
app.get('/api/wtw', async (req, res) => {
    try {
        const allMovies = await db.getAllWhereToWatch();
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching all where to watch locations", error);
        res.status(500).json({ error: "No where to watch locations" });
    }
});


// Get all the movies with a specific rating
app.get('/api/movies/rating/:rating', async (req, res) => {
    try {
        const allMovies = await db.getMoviesWithSpecificRating(Number(req.params.rating));
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching movies with specific rating", error);
        res.status(500).json({ error: "No movies with such rating" });
    }
});

// Get all the movies with a rating greater than a specified value
app.get('/api/movies/rating/greater/:rating', async (req, res) => {
    try {
        const allMovies = await db.getMoviesWithRatingGreaterThanOrEqualTo(Number(req.params.rating));
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching movies with rating greater than or equal to", error);
        res.status(500).json({ error: "No movies with such rating" });
    }
});

// Get the top 10 movies by popularity
app.get('/api/movies/top10', async (req, res) => {
    try {
        const allMovies = await db.getTop10MoviesByPopularity();
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching top 10 movies by popularity", error);
        res.status(500).json({ error: "Cannot find the top 10 movies by popularity" });
    }
});

// Get all the movies available to watch online in a specific language
app.get('/api/movies/online/:language', async (req, res) => {
    try {
        const allMovies = await db.getMoviesAvailableToWatchOnlineInLanguage(req.params.language);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching movies available to watch online in language", error);
        res.status(500).json({ error: "No movies with ${req.params.language} is available to watch online" });
    }
});

// Add this route to get movies by language name
app.get('/api/movies/language/:language', async (req, res) => {
    try {
      const language = req.params.language;
      const movies = await db.getMoviesByLanguage(language);
  
      res.status(200).json(movies);
    } catch (error) {
      console.error("Error fetching movies by language:", error);
      res.status(500).json({ error: "Error fetching movies by language" });
    }
});

// Get all languages
app.get('/api/languages', async (req, res) => {
    try {
      const allLanguages = await db.getAllLanguages();
      res.status(200).json(allLanguages);
    } catch (error) {
      console.error("Error fetching all languages", error);
      res.status(500).json({ error: "Error fetching all languages" });
    }
});

// Get all the Awards obtained by a specific movie
app.get('/api/movies/awards/:id', async (req, res) => {
    try {
        const allMovies = await db.getAwardsObtainedByMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    } catch (error) {
        console.error("Error fetching awards obtained by movie", error);
        res.status(500).json({ error: "No awards obtained by such movie" });
    }
});

// Search Movie by Title
app.get('/api/movies/search/:term', async (req, res) => {
    try {
      const searchTerm = req.params.term.toLowerCase();
      const movie = await db.searchMovieByTitle(searchTerm);
  
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error searching for movie:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Post Method for all the post functions in database.ts
// app.post('/movies', async (req, res) => {
//     try {
//         const allMovies: any = await db.addMovie(req.body);
//         console.log(allMovies[0]);
//         res.status(200).json(allMovies[0]);
//     } catch (error) {
//         console.error("Error adding movie", error);
//         res.status(500).json({ error: "Error adding movie" });
//     }
// });

// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});