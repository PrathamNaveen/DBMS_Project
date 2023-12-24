import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import * as md from '../models/model.js';

dotenv.config();

// MySQL Database Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'your_database',
});

export async function getMovies(): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute("SELECT * FROM MOVIE");

    // Assuming rows is of type OkPacket[], directly cast it to List
    return rows as md.Movie[];
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

export async function getMovieById(id: string): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM MOVIE
      WHERE MovieID = ?;
      `,
      [id]
    );

    return rows as md.Movie[];
  } catch (error) {
    console.log("Error fetching movie by id:", error);
    throw error;
  }
}

export async function getDirectorOfSpecificMovie(id: string): Promise<md.Director[]>{
  try {
    const [rows] = await pool.execute(
      `
      SELECT M.Title, D.FirstName, D.LastName 
      FROM DIRECTOR D, MOVIE M, MOVIE_DIRECTOR MD
      WHERE M.MovieID=MD.MovieID AND D.DirectorID=MD.DirectorID AND M.MovieID= ? ;
      `,
      [id]
    );

    return rows as md.Director[];

  } catch (error) {
    console.log("Error fetching director name by movie id:", error);
    throw error;
  }
}

export async function getGenreOfSpecificMovie(id: string): Promise<md.Genre[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT M.Title, G.GenreName
      FROM GENRE G, MOVIE_GENRE MG, Movie M
      WHERE MG.MovieID = ? AND G.GenreID = MG.GenreID;
      `,
      [id]
    );

    return rows as md.Genre[];
  } catch (error) {
    console.log("Error fetching genre by movie id:", error);
    throw error;
  }
}

export async function getAllGenres(): Promise<md.Genre[]> {
  try {
    const [rows] = await pool.execute("SELECT GenreName FROM GENRE");
    return rows as md.Genre[];
  } catch (error) {
    console.error('Error fetching all genres:', error);
    throw error;
  }
}

// get movies by genre name
export async function getMoviesByGenre(genreName: string): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT M.*, MG.GenreId, G.GenreName
      FROM MOVIE M
      JOIN MOVIE_GENRE MG ON M.MovieID = MG.MovieID
      JOIN GENRE G ON G.GenreID = MG.GenreID
      WHERE G.GenreName = ?;      
      `,
      [genreName]
    );

    return rows as md.Movie[];
  } catch (error) {
    console.log("Error fetching movies by genre:", error);
    throw error;
  }
}


export async function getCastOfSpecificMovie(id: string): Promise<md.Cast[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT C.FirstName, C.LastName, MC.ActingAs
      FROM CAST_DETAILS C, MOVIE_CAST MC
      WHERE C.CastID = MC.CastID AND MC.MovieID = ?;
      `,
      [id]
    );

    return rows as md.Cast[];
  } catch (error) {
    console.log("Error fetching cast member by id:", error);
    throw error;
  }
}

// Get the where to watch location for a specific movie
export async function getWhereToWatch(movieId: string): Promise<md.WhereToWatch[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT W.WtwName
      FROM WHERE_TO_WATCH W, MOVIE_WTW MW
      WHERE W.WtwID = MW.WtwID AND MW.MovieID = ?;
      `,
      [movieId]
    );

    return rows as md.WhereToWatch[];
  } catch (error) {
      console.log("Error fetching where to watch location for movie:", error);
      throw error;
  }
}

// Get all the where to watch locations for all movies
export async function getAllWhereToWatch(): Promise<md.WhereToWatch[]> {
  try {
    const [rows] = await pool.execute("SELECT WtwName FROM WHERE_TO_WATCH");

    return rows as md.WhereToWatch[];
  } catch (error) {
      console.log("Error fetching all where to watch locations:", error);
      throw error;
  }
}

// get movies by Where to Watch name
export async function getMoviesByWhereToWatch(wtwName: string): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT M.*, MW.WtwID, W.WtwName
      FROM MOVIE M
      JOIN MOVIE_WTW MW ON M.MovieID = MW.MovieID
      JOIN WHERE_TO_WATCH W ON W.WtwID = MW.WtwID
      WHERE W.WtwName = ?;      
      `,
      [wtwName]
    );

    return rows as md.Movie[];
  } catch (error) {
    console.log("Error fetching movies by Where to Watch:", error);
    throw error;
  }
}


// Get all the movies with a specific rating
export async function getMoviesWithSpecificRating(rating: number): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM MOVIE
      WHERE Rating = ?;
      `,
      [rating]
    );

    return rows as md.Movie[];
  } catch (error) {
      console.log("Error fetching movies with specific rating:", error);
      throw error;
  }
}

// Get all the movies with a rating greater than a specified value
export async function getMoviesWithRatingGreaterThanOrEqualTo(rating: number): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM MOVIE
      WHERE Rating >= ?;
      `,
      [rating]
    );

    return rows as md.Movie[];
  } catch (error) {
      console.log(`Error fetching movies with rating greater than or equal to ${rating}\n`, error);
      throw error;
  }
}

// Get the top 10 movies by popularity
export async function getTop10MoviesByPopularity(): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM MOVIE
      ORDER BY Popularity DESC
      LIMIT 10;
      `
    );

    return rows as md.Movie[];
  } catch (error) {
      console.log("Error fetching top 10 movies by popularity:", error);
      throw error;
  }
}

// Get all the movies available to watch online in a specific language
export async function getMoviesAvailableToWatchOnlineInLanguage(language: string): Promise<md.Movie[]> {

  const titleCaseLanguage = (language: string): string => {
    return language.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  };

  try {
    const [rows] = await pool.execute(
      `
      SELECT M.*
      FROM MOVIE M
      JOIN MOVIE_WTW MW ON M.MovieID = MW.MovieID
      JOIN WHERE_TO_WATCH W ON MW.WtwID = W.WtwID
      WHERE M.Language = ? 
        AND W.WtwName IN ('Netflix', 'Amazon Prime', 'Disney+ Hotstar');
      `,
      [language]
    );

    return rows as md.Movie[];
  } catch (error) {
      console.log("Error fetching movies available to watch online in language:", error);
      throw error;
  }
}

// get movies by language name
export async function getMoviesByLanguage(languageName: string): Promise<md.Movie[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT M.*, ML.LanguageId
      FROM MOVIE M, MOVIE_LANGUAGE ML
      WHERE M.Language = ? AND M.MovieID = ML.MovieID;
      `,
      [languageName]
    );

    return rows as md.Movie[];
  } catch (error) {
    console.log("Error fetching movies by language:", error);
    throw error;
  }
}


// Get All Languages
export async function getAllLanguages(): Promise<md.Language[]> {
  try {
    const [rows] = await pool.execute("SELECT LanguageName FROM LANGUAGE");
    return rows as md.Language[];
  } catch (error) {
    console.error('Error fetching all languages:', error);
    throw error;
  }
}

// Get all the Awards obtained by a specific movie
export async function getAwardsObtainedByMovie(movieId: string): Promise<md.Award[]> {
  try {
    const [rows] = await pool.execute(
      `
      SELECT M.Title, A.AwardName
      FROM MOVIE M, AWARD A, MOVIE_AWARD MA
      WHERE M.MovieID = MA.MovieID AND A.AwardID = MA.AwardID AND MA.MovieID = ?;
      `,
      [movieId]
    );

    return rows as md.Award[];
  } catch (error) {
      console.log("Error fetching awards obtained by movie:", error);
      throw error;
  }
}

// Post Request to add a Movie to the Database
export async function addMovie(movie: md.Movie) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO MOVIE (MovieID, Title, GenreID, ReleaseDate, Rating, Plot, DirectorID, CastID, WtwID, MovieLength, PosterLink, Language, Awards, Popularity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
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
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding movie to database:", error);
      throw error;
  }
}

// Post Request to add a Director to the Database
export async function addDirector(director: md.Director) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO DIRECTOR (DirectorID, FirstName, LastName)
      VALUES (?, ?, ?);
      `,
      [
        director.DirectorID,
        director.FirstName,
        director.LastName,
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding director to database:", error);
      throw error;
  }
}

// Post Request to add a Genre to the Database
export async function addGenre(genre: md.Genre) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO GENRE (GenreID, GenreName)
      VALUES (?, ?);
      `,
      [
        genre.GenreID,
        genre.GenreName,
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding genre to database:", error);
      throw error;
  }
}

// Post method to add a language
export async function addLanguage(language: md.Language) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO LANGUAGE (LanguageID, LanguageName)
      VALUES (?, ?);
      `,
      [
        language.LanguageID,
        language.LanguageName,
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding language to database:", error);
      throw error;
  }
}

// Post method to add a Award
export async function addAward(award: md.Award) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO AWARD (AwardID, AwardName)
      VALUES (?, ?);
      `,
      [
        award.AwardID,
        award.AwardName,
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding award to database:", error);
      throw error;
  }
}

// Post method to add WhereToWatch location
export async function addWhereToWatch(whereToWatch: md.WhereToWatch) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO WHERE_TO_WATCH (WtwID, WtwName)
      VALUES (?, ?);
      `,
      [
        whereToWatch.WtwID,
        whereToWatch.WtwName,
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding where to watch to database:", error);
      throw error;
  }
}

// Post Request to add a Cast to the Database
export async function addCast(cast: md.Cast) {
  try {
    const [rows] = await pool.execute(
      `
      INSERT INTO CAST_DETAILS (CastID, FirstName, LastName)
      VALUES (?, ?, ?);
      `,
      [
        cast.CastID,
        cast.FirstName,
        cast.LastName,
      ]
    );

    return rows;
  } catch (error) {
      console.log("Error adding cast to database:", error);
      throw error;
  }
}

// Search Movie By Title
// Add this to your database file
export async function searchMovieByTitle(title: string): Promise<md.Movie | null> {
  try {
    const [rows]: any[] = await pool.execute(
      `
      SELECT *
      FROM MOVIE
      WHERE LOWER(Title) = ?;
      `,
      [title]
    );

    if (rows && rows.length > 0) {
      // Use the `rows[0]` directly if it's an array
      return rows[0] as md.Movie;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error searching for movie by title:', error);
    throw error;
  }
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

