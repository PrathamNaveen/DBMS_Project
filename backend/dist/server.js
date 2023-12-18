// Main Backend code using Node and Express
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/api/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getMovies();
        allMovies.forEach((movie) => {
            console.log(movie);
        });
        res.status(200).json(allMovies);
    }
    catch (error) {
        console.error("Error fetching movies", error);
        res.status(500).json({ error: "Error fetching movies" });
    }
}));
// Movie by specific ID
app.get('/api/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getMovieById(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error getting movie Id", error);
        res.status(500).json({ error: "No movie by that id" });
    }
}));
// Director of a specific movie
app.get('/api/director/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getDirectorOfSpecificMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching director id", error);
        res.status(500).json({ error: "No director by such id" });
    }
}));
// Get Genre of specific movie
app.get('/api/genre/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getGenreOfSpecificMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching genre id", error);
        res.status(500).json({ error: "No genre by such id" });
    }
}));
// Get Cast of specific movie
app.get('/api/cast/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getCastOfSpecificMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching cast id", error);
        res.status(500).json({ error: "No cast by such id" });
    }
}));
// Get the where to watch location for a specific movie
app.get('/api/wtw/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getWhereToWatch(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching where to watch id", error);
        res.status(500).json({ error: "No where to watch by such id" });
    }
}));
// Get all the where to watch locations for all movies
app.get('/api/wtw', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getAllWhereToWatch();
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching all where to watch locations", error);
        res.status(500).json({ error: "No where to watch locations" });
    }
}));
// Get all the movies with a specific rating
app.get('/api/movies/rating/:rating', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getMoviesWithSpecificRating(Number(req.params.rating));
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching movies with specific rating", error);
        res.status(500).json({ error: "No movies with such rating" });
    }
}));
// Get all the movies with a rating greater than a specified value
app.get('/api/movies/rating/greater/:rating', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getMoviesWithRatingGreaterThanOrEqualTo(Number(req.params.rating));
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching movies with rating greater than or equal to", error);
        res.status(500).json({ error: "No movies with such rating" });
    }
}));
// Get the top 10 movies by popularity
app.get('/api/movies/top10', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getTop10MoviesByPopularity();
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching top 10 movies by popularity", error);
        res.status(500).json({ error: "Cannot find the top 10 movies by popularity" });
    }
}));
// Get all the movies available to watch online in a specific language
app.get('/api/movies/online/:language', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getMoviesAvailableToWatchOnlineInLanguage(req.params.language);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching movies available to watch online in language", error);
        res.status(500).json({ error: "No movies with ${req.params.language} is available to watch online" });
    }
}));
// Get all the Awards obtained by a specific movie
app.get('/api/movies/awards/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield db.getAwardsObtainedByMovie(req.params.id);
        console.log(allMovies[0]);
        res.status(200).json(allMovies[0]);
    }
    catch (error) {
        console.error("Error fetching awards obtained by movie", error);
        res.status(500).json({ error: "No awards obtained by such movie" });
    }
}));
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
