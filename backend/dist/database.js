"use strict";
// Querying Code
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAwardsObtainedByMovie = exports.getMoviesAvailableToWatchOnlineInLanguage = exports.getTop10MoviesByPopularity = exports.getMoviesWithRatingGreaterThanOrEqualTo = exports.getMoviesWithSpecificRating = exports.getAllWhereToWatch = exports.getWhereToWatch = exports.getCastOfSpecificMovie = exports.getGenreOfSpecificMovie = exports.getDirectorOfSpecificMovie = exports.getMovieById = exports.getMovies = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MySQL Database Connection
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'your_database',
});
function getMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute("SELECT * FROM MOVIE");
            // Assuming rows is of type OkPacket[], directly cast it to List
            return rows;
        }
        catch (error) {
            console.error('Error fetching data from database:', error);
            throw error;
        }
    });
}
exports.getMovies = getMovies;
function getMovieById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT *
      FROM MOVIE
      WHERE MovieID = ?;
      `, [id]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching movie by id:", error);
            throw error;
        }
    });
}
exports.getMovieById = getMovieById;
function getDirectorOfSpecificMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT M.Title, D.FirstName, D.LastName 
      FROM DIRECTOR D, MOVIE M, MOVIE_DIRECTOR MD
      WHERE M.MovieID=MD.MovieID AND D.DirectorID=MD.DirectorID AND M.MovieID= ? ;
      `, [id]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching director name by movie id:", error);
            throw error;
        }
    });
}
exports.getDirectorOfSpecificMovie = getDirectorOfSpecificMovie;
function getGenreOfSpecificMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT M.Title, G.GenreName
      FROM GENRE G, MOVIE_GENRE MG, Movie M
      WHERE MG.MovieID = ? AND G.GenreID = MG.GenreID;
      `, [id]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching genre by movie id:", error);
            throw error;
        }
    });
}
exports.getGenreOfSpecificMovie = getGenreOfSpecificMovie;
function getCastOfSpecificMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT C.FirstName, C.LastName, MC.ActingAs
      FROM CAST_DETAILS C, MOVIE_CAST MC
      WHERE C.CastID = MC.CastID AND MC.MovieID = ?;
      `, [id]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching cast member by id:", error);
            throw error;
        }
    });
}
exports.getCastOfSpecificMovie = getCastOfSpecificMovie;
// Get the where to watch location for a specific movie
function getWhereToWatch(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT W.WtwName
      FROM WHERE_TO_WATCH W, MOVIE_WTW MW
      WHERE W.WtwID = MW.WtwID AND MW.MovieID = ?;
      `, [movieId]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching where to watch location for movie:", error);
            throw error;
        }
    });
}
exports.getWhereToWatch = getWhereToWatch;
// Get all the where to watch locations for all movies
function getAllWhereToWatch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute("SELECT WtwName FROM WHERE_TO_WATCH");
            return rows;
        }
        catch (error) {
            console.log("Error fetching all where to watch locations:", error);
            throw error;
        }
    });
}
exports.getAllWhereToWatch = getAllWhereToWatch;
// Get all the movies with a specific rating
function getMoviesWithSpecificRating(rating) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT *
      FROM MOVIE
      WHERE Rating = ?;
      `, [rating]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching movies with specific rating:", error);
            throw error;
        }
    });
}
exports.getMoviesWithSpecificRating = getMoviesWithSpecificRating;
// Get all the movies with a rating greater than a specified value
function getMoviesWithRatingGreaterThanOrEqualTo(rating) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT *
      FROM MOVIE
      WHERE Rating >= ?;
      `, [rating]);
            return rows;
        }
        catch (error) {
            console.log(`Error fetching movies with rating greater than or equal to ${rating}\n`, error);
            throw error;
        }
    });
}
exports.getMoviesWithRatingGreaterThanOrEqualTo = getMoviesWithRatingGreaterThanOrEqualTo;
// Get the top 10 movies by popularity
function getTop10MoviesByPopularity() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT *
      FROM MOVIE
      ORDER BY Popularity DESC
      LIMIT 10;
      `);
            return rows;
        }
        catch (error) {
            console.log("Error fetching top 10 movies by popularity:", error);
            throw error;
        }
    });
}
exports.getTop10MoviesByPopularity = getTop10MoviesByPopularity;
// Get all the movies available to watch online in a specific language
function getMoviesAvailableToWatchOnlineInLanguage(language) {
    return __awaiter(this, void 0, void 0, function* () {
        const titleCaseLanguage = (language) => {
            return language.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
        };
        try {
            const [rows] = yield pool.execute(`
      SELECT M.*
      FROM MOVIE M
      JOIN MOVIE_WTW MW ON M.MovieID = MW.MovieID
      JOIN WHERE_TO_WATCH W ON MW.WtwID = W.WtwID
      WHERE M.Language = ? 
        AND W.WtwName IN ('Netflix', 'Amazon Prime', 'Disney+ Hotstar');
      `, [language]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching movies available to watch online in language:", error);
            throw error;
        }
    });
}
exports.getMoviesAvailableToWatchOnlineInLanguage = getMoviesAvailableToWatchOnlineInLanguage;
// Get all the Awards obtained by a specific movie
function getAwardsObtainedByMovie(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT M.Title, A.AwardName
      FROM MOVIE M, AWARD A, MOVIE_AWARD MA
      WHERE M.MovieID = MA.MovieID AND A.AwardID = MA.AwardID AND MA.MovieID = ?;
      `, [movieId]);
            return rows;
        }
        catch (error) {
            console.log("Error fetching awards obtained by movie:", error);
            throw error;
        }
    });
}
exports.getAwardsObtainedByMovie = getAwardsObtainedByMovie;
// async function main() {
//     try {
//         // const movies = await getMovies();
//         // console.log("All Movies:", movies);
//         // const movieById = await getMovieById("m001");
//         // console.log("Movie by ID:", movieById);
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }
// main();
