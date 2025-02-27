import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { movies, series } from "@/database/schema"; // Import the tables
import { movieGenres, tvGenres } from "@/types"; // Ensure correct import path
import { eq } from "drizzle-orm"; // Import the equality operator for queries

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";

async function fetchMoviesByGenre(genreId: number) {
    try {
        const response = await fetch(
            `${TMDB_API_URL}/discover/movie?with_genres=${genreId}&language=en-US&page=1&include_adult=false`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            }
        );
        if (!response.ok) throw new Error(`Failed to fetch movies for genre ${genreId}`);

        const data = await response.json();
        return data.results.slice(0, 5);
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchShowsByGenre(genreId: number) {
    try {
        const response = await fetch(
            `${TMDB_API_URL}/discover/tv?with_genres=${genreId}&language=en-US&page=1`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            }
        );
        if (!response.ok) throw new Error(`Failed to fetch TV shows for genre ${genreId}`);

        const data = await response.json();
        return data.results.slice(0, 5);
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Get movie details
async function fetchMovieDetails(movieId: number) {
    try {
        const response = await fetch(
            `${TMDB_API_URL}/movie/${movieId}?language=en-US&append_to_response=credits,videos,external_ids`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            }
        );

        if (!response.ok) throw new Error(`Failed to fetch details for movie ${movieId}`);

        const data = await response.json();

        return {
            director: data.credits?.crew?.find((member: any) => member.job === "Director")?.name || "Unknown",
            cast: data.credits?.cast?.slice(0, 5).map((actor: any) => actor.name).join(", ") || "Unknown",
            trailerUrl: data.videos?.results?.find((video: any) => video.type === "Trailer")?.key
                ? `https://www.youtube.com/watch?v=${data.videos.results.find((video: any) => video.type === "Trailer").key}`
                : null,
            imdbId: data.imdb_id || null,
            duration: data.runtime || 0,
            genres: data.genres?.map((g: any) => g.name).join(", ") || "Unknown",
        };
    } catch (error) {
        console.error(error);
        return { director: "Unknown", cast: "Unknown", trailerUrl: null, imdbId: null, duration: 0, genres: "Unknown" };
    }
}

// Get show details
async function fetchSeriesDetails(seriesId: number) {
    try {
        const response = await fetch(
            `${TMDB_API_URL}/tv/${seriesId}?language=en-US&append_to_response=credits,videos,external_ids`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            }
        );

        if (!response.ok) throw new Error(`Failed to fetch details for series ${seriesId}`);

        const data = await response.json();

        return {
            director: data.credits?.crew?.find((member: any) => member.job === "Director")?.name || "Unknown",
            cast: data.credits?.cast?.slice(0, 5).map((actor: any) => actor.name).join(", ") || "Unknown",
            trailerUrl: data.videos?.results?.find((video: any) => video.type === "Trailer")?.key
                ? `https://www.youtube.com/watch?v=${data.videos.results.find((video: any) => video.type === "Trailer").key}`
                : null,
            imdbId: data.external_ids?.imdb_id || null,
            genres: data.genres?.map((g: any) => g.name).join(", ") || "Unknown",
        };
    } catch (error) {
        console.error(error);
        return { director: "Unknown", cast: "Unknown", trailerUrl: null, imdbId: null, genres: "Unknown" };
    }
}

async function seedDatabase() {
    console.log("🌱 Seeding database with movies and TV shows...");

    // Seed Movies
    for (const genre of movieGenres) {
        const moviesData = await fetchMoviesByGenre(genre.id);

        for (const movie of moviesData) {
            // **Check if movie already exists in the database**
            const existingMovie = await db.select().from(movies).where(eq(movies.tmdbId, movie.id)).limit(1);

            if (existingMovie.length > 0) {
                console.log(`⚠️ Skipping existing movie: ${movie.title}`);
                continue;
            }

            const details = await fetchMovieDetails(movie.id);

            // **Skip movies that do not have an IMDb ID**
            if (!details.imdbId) {
                console.log(`⚠️ Skipping movie with no IMDb ID: ${movie.title}`);
                continue;
            }

            await db.insert(movies).values({
                title: movie.title,
                originalTitle: movie.original_title,
                description: movie.overview,
                releaseDate: movie.release_date ? new Date(movie.release_date) : null,
                genre: genre.name,
                duration: details.duration,
                director: details.director,
                cast: details.cast,
                rating: movie.vote_average,
                popularity: movie.popularity,
                language: movie.original_language,
                posterUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                coverUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                trailerUrl: details.trailerUrl,
                tmdbId: movie.id,
                imdbId: details.imdbId,
            });
        }

        console.log(`✅ Added new movies for genre: ${genre.name}`);
    }

    // Seed TV Shows
    for (const genre of tvGenres) {
        const showsData = await fetchShowsByGenre(genre.id);

        for (const show of showsData) {
            // **Check if TV show already exists in the database**
            const existingShow = await db.select().from(series).where(eq(series.tmdbId, show.id)).limit(1);

            if (existingShow.length > 0) {
                console.log(`⚠️ Skipping existing TV show: ${show.name}`);
                continue;
            }

            const details = await fetchSeriesDetails(show.id);

            // **Skip TV shows that do not have an IMDb ID**
            if (!details.imdbId) {
                console.log(`⚠️ Skipping TV show with no IMDb ID: ${show.name}`);
                continue;
            }

            await db.insert(series).values({
                title: show.name,
                description: show.overview,
                releaseDate: show.first_air_date ? new Date(show.first_air_date) : null,
                genre: genre.name,
                rating: show.vote_average,
                popularity: show.popularity,
                language: show.original_language,
                posterUrl: `https://image.tmdb.org/t/p/original${show.poster_path}`,
                coverUrl: `https://image.tmdb.org/t/p/original${show.backdrop_path}`,
                trailerUrl: details.trailerUrl,
                tmdbId: show.id,
                imdbId: details.imdbId,
            });
        }

        console.log(`✅ Added new TV shows for genre: ${genre.name}`);
    }

    console.log("🎉 Seeding complete!");
}

seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    });