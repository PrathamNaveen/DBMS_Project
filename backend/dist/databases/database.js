var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// MySQL Database Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'your_database',
});
export function getMovies() {
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
export function getMovieById(id) {
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
export function getDirectorOfSpecificMovie(id) {
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
export function getGenreOfSpecificMovie(id) {
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
export function getAllGenres() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute("SELECT GenreName FROM GENRE");
            return rows;
        }
        catch (error) {
            console.error('Error fetching all genres:', error);
            throw error;
        }
    });
}
export function getCastOfSpecificMovie(id) {
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
// Get the where to watch location for a specific movie
export function getWhereToWatch(movieId) {
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
// Get all the where to watch locations for all movies
export function getAllWhereToWatch() {
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
// Get all the movies with a specific rating
export function getMoviesWithSpecificRating(rating) {
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
// Get all the movies with a rating greater than a specified value
export function getMoviesWithRatingGreaterThanOrEqualTo(rating) {
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
// Get the top 10 movies by popularity
export function getTop10MoviesByPopularity() {
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
// Get all the movies available to watch online in a specific language
export function getMoviesAvailableToWatchOnlineInLanguage(language) {
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
// Get All Languages
export function getAllLanguages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute("SELECT LanguageName FROM LANGUAGE");
            return rows;
        }
        catch (error) {
            console.error('Error fetching all languages:', error);
            throw error;
        }
    });
}
// Get all the Awards obtained by a specific movie
export function getAwardsObtainedByMovie(movieId) {
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
// Post Request to add a Movie to the Database
export function addMovie(movie) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO MOVIE (MovieID, Title, GenreID, ReleaseDate, Rating, Plot, DirectorID, CastID, WtwID, MovieLength, PosterLink, Language, Awards, Popularity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `, [
                movie.MovieID,
                movie.Title,
                movie.GenreID,
                movie.ReleaseDate,
                movie.Rating,
                movie.Plot,
                movie.DirectorID,
                movie.CastID,
                movie.WtwID,
                movie.MovieLength,
                movie.PosterLink,
                movie.Language,
                movie.Awards,
                movie.Popularity,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding movie to database:", error);
            throw error;
        }
    });
}
// Post Request to add a Director to the Database
export function addDirector(director) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO DIRECTOR (DirectorID, FirstName, LastName)
      VALUES (?, ?, ?);
      `, [
                director.DirectorID,
                director.FirstName,
                director.LastName,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding director to database:", error);
            throw error;
        }
    });
}
// Post Request to add a Genre to the Database
export function addGenre(genre) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO GENRE (GenreID, GenreName)
      VALUES (?, ?);
      `, [
                genre.GenreID,
                genre.GenreName,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding genre to database:", error);
            throw error;
        }
    });
}
// Post method to add a language
export function addLanguage(language) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO LANGUAGE (LanguageID, LanguageName)
      VALUES (?, ?);
      `, [
                language.LanguageID,
                language.LanguageName,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding language to database:", error);
            throw error;
        }
    });
}
// Post method to add a Award
export function addAward(award) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO AWARD (AwardID, AwardName)
      VALUES (?, ?);
      `, [
                award.AwardID,
                award.AwardName,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding award to database:", error);
            throw error;
        }
    });
}
// Post method to add WhereToWatch location
export function addWhereToWatch(whereToWatch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO WHERE_TO_WATCH (WtwID, WtwName)
      VALUES (?, ?);
      `, [
                whereToWatch.WtwID,
                whereToWatch.WtwName,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding where to watch to database:", error);
            throw error;
        }
    });
}
// Post Request to add a Cast to the Database
export function addCast(cast) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      INSERT INTO CAST_DETAILS (CastID, FirstName, LastName)
      VALUES (?, ?, ?);
      `, [
                cast.CastID,
                cast.FirstName,
                cast.LastName,
            ]);
            return rows;
        }
        catch (error) {
            console.log("Error adding cast to database:", error);
            throw error;
        }
    });
}
// Search Movie By Title
// Add this to your database file
export function searchMovieByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute(`
      SELECT *
      FROM MOVIE
      WHERE LOWER(Title) = ?;
      `, [title]);
            if (rows && rows.length > 0) {
                // Use the `rows[0]` directly if it's an array
                return rows[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error searching for movie by title:', error);
            throw error;
        }
    });
}
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
