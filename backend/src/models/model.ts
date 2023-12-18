interface Movie {
    MovieID: string;
    Title: string;
    GenreID: string;
    ReleaseDate: string;
    Rating: number;
    Plot: string;
    DirectorID: string;
    CastID: string;
    WtwID: string;
    MovieLength: number;
    PosterLink: string;
    Language: string;
    Awards: string;
    Popularity: number;
}

interface Director {
    DirectorID: string;
    FirstName: string;
    LastName: string;
}

interface Genre {
    GenreID: string;
    GenreName: string;
}

interface Cast {
    CastID: string;
    FirstName: string;
    LastName: string;
    Role: string;
}

interface Award {
    AwardID: string;
    AwardName: string;
}

interface WhereToWatch {
    WtwID: string;
    WtwName: string;
}

interface Language {
    LanguageID: string;
    LanguageName: string;
}

export { Movie, Director, Genre, Cast, Award, WhereToWatch, Language };
