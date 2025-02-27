export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate: Date;
}

export interface Account {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
}

export interface Session {
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Authenticator {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string;
}

/** Movie Interface */
export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  description?: string;
  releaseDate?: Date;
  genre?: string;
  duration?: number;
  director?: string;
  cast?: string;
  rating?: number;
  popularity?: number;
  language?: string;
  posterUrl?: string;
  coverUrl?: string;
  trailerUrl?: string;
  tmdbId: string;
  imdbId: string;
  createdAt: Date;
}

/** Series Interface */
export interface Series {
  id: string;
  title: string;
  description?: string;
  genre?: string;
  releaseDate?: Date;
  rating?: number;
  popularity?: number;
  language?: string;
  posterUrl?: string;
  coverUrl?: string;
  trailerUrl?: string;
  tmdbId: string;
  imdbId: string;
  createdAt: Date;
}

/** Season Interface */
export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  releaseDate?: Date;
  createdAt: Date;
}

/** Episode Interface */
export interface Episode {
  id: string;
  seriesId: string;
  seasonId: string;
  title: string;
  description?: string;
  duration?: number;
  releaseDate?: Date;
  videoUrl?: string;
  createdAt: Date;
}

/** Watchlist Interface */
export interface Watchlist {
  id: string;
  userId: string;
  movieId?: string;
  seriesId?: string;
  addedAt: Date;
}

/** Library Interface */
export interface Library {
  id: string;
  userId: string;
  movieId?: string;
  seriesId?: string;
  addedAt: Date;
}

/** Watch History Interface */
export interface WatchHistory {
  id: string;
  userId: string;
  movieId?: string;
  seriesId?: string;
  episodeId?: string;
  watchedAt: Date;
}

/** Reviews Interface */
export interface Review {
  id: string;
  userId: string;
  movieId?: string;
  seriesId?: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

/** Movie & TV Show Genres */
export interface MovieGenre {
  id: number;
  name: string;
}

export interface TVGenre {
  id: number;
  name: string;
}

export const movieGenres: MovieGenre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const tvGenres: TVGenre[] = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];