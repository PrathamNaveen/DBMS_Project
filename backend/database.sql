-- A text file which contains the Database implementation in MySQL

DROP DATABASE IF EXISTS MOVIE_DB;

CREATE DATABASE MOVIE_DB;

USE MOVIE_DB;

-- MOVIE table
CREATE TABLE MOVIE (
    MovieID VARCHAR(255) PRIMARY KEY,
    Title VARCHAR(255),
    GenreID VARCHAR(255) UNIQUE NOT NULL,
    ReleaseDate DATE,
    Rating DECIMAL(3,2),
    Plot TEXT,
    DirectorID VARCHAR(255) UNIQUE NOT NULL,
    CastID VARCHAR(255) UNIQUE NOT NULL,
    WtwID VARCHAR(255),
    MovieLength INT,
    PosterLink VARCHAR(255),
    Language VARCHAR(255),
    Awards VARCHAR(255),  
    Popularity INT
);

-- GENRE table
CREATE TABLE GENRE (
    GenreID VARCHAR(255) PRIMARY KEY,
    GenreName VARCHAR(255) UNIQUE NOT NULL
);

-- WHERE_TO_WATCH table
CREATE TABLE WHERE_TO_WATCH (
    WtwID VARCHAR(255) PRIMARY KEY,
    WtwName VARCHAR(255) UNIQUE
);

-- LANGUAGE table
CREATE TABLE LANGUAGE (
    LanguageID VARCHAR(255) PRIMARY KEY,
    LanguageName VARCHAR(255) UNIQUE NOT NULL
);

-- AWARD table
CREATE TABLE AWARD (
    AwardID VARCHAR(255) PRIMARY KEY,
    AwardName VARCHAR(255) UNIQUE
);

-- CAST table
CREATE TABLE CAST_DETAILS (
    CastID VARCHAR(255) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255)
);

-- DIRECTOR table
CREATE TABLE DIRECTOR (
    DirectorID VARCHAR(255) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255)
);

-- MOVIE_GENRE junction table
CREATE TABLE MOVIE_GENRE (
    MovieID VARCHAR(255),
    GenreID VARCHAR(255),
    PRIMARY KEY (MovieID, GenreID),
    FOREIGN KEY (MovieID) REFERENCES MOVIE(MovieID),
    FOREIGN KEY (GenreID) REFERENCES GENRE(GenreID)
);

-- MOVIE_WTW junction table
CREATE TABLE MOVIE_WTW (
    MovieID VARCHAR(255),
    WtwID VARCHAR(255),
    PRIMARY KEY (MovieID, WtwID),
    FOREIGN KEY (MovieID) REFERENCES MOVIE(MovieID),
    FOREIGN KEY (WtwID) REFERENCES WHERE_TO_WATCH(WtwID)
);

-- MOVIE_LANGUAGE junction table
CREATE TABLE MOVIE_LANGUAGE (
    MovieID VARCHAR(255),
    LanguageID VARCHAR(255),
    PRIMARY KEY (MovieID, LanguageID),
    FOREIGN KEY (MovieID) REFERENCES MOVIE(MovieID),
    FOREIGN KEY (LanguageID) REFERENCES LANGUAGE(LanguageID)
);

-- MOVIE_AWARD junction table
CREATE TABLE MOVIE_AWARD (
    MovieID VARCHAR(255),
    AwardID VARCHAR(255),
    PRIMARY KEY (MovieID, AwardID),
    FOREIGN KEY (MovieID) REFERENCES MOVIE(MovieID),
    FOREIGN KEY (AwardID) REFERENCES AWARD(AwardID)
);

-- MOVIE_CAST table
CREATE TABLE MOVIE_CAST (
    MovieID VARCHAR(255),
    CastID VARCHAR(255),
    ActingAs VARCHAR(255),
    PRIMARY KEY (MovieID, CastID),
    FOREIGN KEY (MovieID) REFERENCES MOVIE(MovieID),
    FOREIGN KEY (CastID) REFERENCES CAST_DETAILS(CastID)
);

-- MOVIE_DIRECTOR table
CREATE TABLE MOVIE_DIRECTOR (
    MovieID VARCHAR(255),
    DirectorID VARCHAR(255),
    PRIMARY KEY (MovieID, DirectorID),
    FOREIGN KEY (MovieID) REFERENCES MOVIE(MovieID),
    FOREIGN KEY (DirectorID) REFERENCES DIRECTOR(DirectorID)
);

-- Drop all the table names below

DROP TABLE IF EXISTS MOVIE;
DROP TABLE IF EXISTS GENRE;
DROP TABLE IF EXISTS WHERE_TO_WATCH;
DROP TABLE IF EXISTS LANGUAGE;
DROP TABLE IF EXISTS AWARD;
DROP TABLE IF EXISTS CAST_DETAILS;
DROP TABLE IF EXISTS DIRECTOR;
DROP TABLE IF EXISTS MOVIE_GENRE;
DROP TABLE IF EXISTS MOVIE_WTW;
DROP TABLE IF EXISTS MOVIE_LANGUAGE;
DROP TABLE IF EXISTS MOVIE_AWARD;
DROP TABLE IF EXISTS MOVIE_CAST;
DROP TABLE IF EXISTS MOVIE_DIRECTOR;

-- Select all the table names below

SELECT * FROM MOVIE;
SELECT * FROM GENRE;
SELECT * FROM WHERE_TO_WATCH;
SELECT * FROM LANGUAGE;
SELECT * FROM AWARD;
SELECT * FROM CAST_DETAILS;
SELECT * FROM DIRECTOR;
SELECT * FROM MOVIE_GENRE;
SELECT * FROM MOVIE_WTW;
SELECT * FROM MOVIE_LANGUAGE;
SELECT * FROM MOVIE_AWARD;
SELECT * FROM MOVIE_CAST;
SELECT * FROM MOVIE_DIRECTOR;


-- INSERT (Fill 99 or 49 movies below)

-- Inserting into MOVIE
INSERT INTO MOVIE (MovieID, Title, GenreID, ReleaseDate, Rating, Plot, 
DirectorID, CastID, WtwID, MovieLength, PosterLink, Language, Awards, Popularity) VALUES 
('m001', 'Inception', 'g001', '2010-07-16', 9.3, 'A mind-bending heist film...', 
'd001', 'c001', 'wtw001', 148, 'https://example.com/poster', 'English', 'Best Picture', 95);

INSERT INTO MOVIE (MovieID, Title, GenreID, ReleaseDate, Rating, Plot, 
DirectorID, CastID, WtwID, MovieLength, PosterLink, Language, Awards, Popularity) 
VALUES 
('m002', 'The Matrix', 'g002', '1999-03-31', 8.7, 'A sci-fi action film...', 
'd002', 'c002', 'wtw002', 136, 'https://example.com/matrix_poster', 'English', 'Best Visual Effects', 88);


-- Inserting into GENRE
INSERT INTO GENRE (GenreID, GenreName) VALUES ('g001', 'Sci-Fi');

-- Inserting into WHERE_TO_WATCH
INSERT INTO WHERE_TO_WATCH (WtwID, WtwName) VALUES ('wtw001', 'Netflix');

-- Inserting into LANGUAGE
INSERT INTO LANGUAGE (LanguageID, LanguageName) VALUES ('l001', 'English');

-- Inserting into AWARD
INSERT INTO AWARD (AwardID, AwardName) VALUES ('a001', 'Best Picture');

-- Inserting into CAST_DETAILS
INSERT INTO CAST_DETAILS (CastID, FirstName, LastName) VALUES ('c001', 'Leonardo', 'DiCaprio');

-- Inserting into DIRECTOR
INSERT INTO DIRECTOR (DirectorID, FirstName, LastName) VALUES ('d001', 'Christopher', 'Nolan');

-- Inserting into MOVIE_GENRE
INSERT INTO MOVIE_GENRE (MovieID, GenreID) VALUES ('m001', 'g001');

-- Inserting into MOVIE_WTW
INSERT INTO MOVIE_WTW (MovieID, WtwID) VALUES ('m001', 'wtw001');

-- Inserting into MOVIE_LANGUAGE
INSERT INTO MOVIE_LANGUAGE (MovieID, LanguageID) VALUES ('m001', 'l001');

-- Inserting into MOVIE_AWARD
INSERT INTO MOVIE_AWARD (MovieID, AwardID) VALUES ('m001', 'a001');

-- Inserting into MOVIE_CAST
INSERT INTO MOVIE_CAST (MovieID, CastID, ActingAs) VALUES ('m001', 'c001', 'Main Character');

-- Inserting into MOVIE_DIRECTOR
INSERT INTO MOVIE_DIRECTOR (MovieID, DirectorID) VALUES ('m001', 'd001');

-- Get the name of the Director for the specific movie

SELECT M.Title, D.FirstName, D.LastName 
FROM DIRECTOR D, MOVIE M, MOVIE_DIRECTOR MD
WHERE M.MovieID=MD.MovieID AND D.DirectorID=MD.DirectorID AND M.MovieID="m001";

-- Inserting Harry Potter and the Sorcerer's Stone

INSERT INTO MOVIE (MovieID, Title, GenreID, ReleaseDate, Rating, Plot, 
DirectorID, CastID, WtwID, MovieLength, PosterLink, Language, Awards, Popularity) VALUES 
('m003', 'Harry Potter and the Sorcerer\'s Stone', 'g003', '2001-11-16', 7.6, 'A young wizard discovers his magical heritage...', 
'd003', 'c003', 'wtw003', 152, 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71x1RHSaEhL._AC_UF894,1000_QL80_.jpg', 'English', 'Best Production Design', 87);



