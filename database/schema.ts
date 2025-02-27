import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  real,
  serial,
  date,
  uuid,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";

const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  lastActivityDate: date("last_activity_date").defaultNow(),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
)

/** Movies Table */
export const movies = pgTable("movies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  originalTitle: text("originalTitle"),
  description: text("description"),
  releaseDate: timestamp("release_date"),
  genre: text("genre"),
  duration: integer("duration"),
  director: text("director"),
  cast: text("cast"),
  rating: real("rating"),
  popularity: real("popularity"),
  language: text("language"),
  posterUrl: text("poster_url"),
  coverUrl: text("cover_url"),
  trailerUrl: text("trailer_url"),
  tmdbId: text("tmdb_id").unique().notNull(), // Changed from integer to text
  imdbId: text("imdb_id").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/** Series Table */
export const series = pgTable("series", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  genre: text("genre"),
  releaseDate: timestamp("release_date"),
  rating: real("rating"),
  popularity: real("popularity"),
  language: text("language"),
  posterUrl: text("poster_url"),
  coverUrl: text("cover_url"),
  trailerUrl: text("trailer_url"),
  tmdbId: text("tmdb_id").unique().notNull(),
  imdbId: text("imdb_id").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/** Seasons Table */
export const seasons = pgTable("seasons", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  seriesId: text("series_id")
    .notNull()
    .references(() => series.id, { onDelete: "cascade" }),
  seasonNumber: integer("season_number").notNull(),
  releaseDate: timestamp("release_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

/** Episodes Table */
export const episodes = pgTable("episodes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  seriesId: text("series_id")
    .notNull()
    .references(() => series.id, { onDelete: "cascade" }),
  seasonId: text("season_id") // Changed from integer to text
    .notNull()
    .references(() => seasons.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  duration: integer("duration"),
  releaseDate: timestamp("release_date"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

/** User Watchlist Table */
export const watchlist = pgTable("watchlist", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  movieId: text("movie_id").references(() => movies.id, { onDelete: "cascade" }),
  seriesId: text("series_id").references(() => series.id, { onDelete: "cascade" }),
  addedAt: timestamp("added_at").defaultNow(),
});

/** User Library Table */
export const library = pgTable("library", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  movieId: text("movie_id").references(() => movies.id, { onDelete: "cascade" }),
  seriesId: text("series_id").references(() => series.id, { onDelete: "cascade" }),
  addedAt: timestamp("added_at").defaultNow(),
});

/** Watch History Table */
export const watchHistory = pgTable("watch_history", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  movieId: text("movie_id").references(() => movies.id, { onDelete: "cascade" }),
  seriesId: text("series_id").references(() => series.id, { onDelete: "cascade" }),
  episodeId: text("episode_id").references(() => episodes.id, { onDelete: "cascade" }),
  watchedAt: timestamp("watched_at").defaultNow(),
});

/** Reviews Table */
export const reviews = pgTable("reviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  movieId: text("movie_id").references(() => movies.id, { onDelete: "cascade" }),
  seriesId: text("series_id").references(() => series.id, { onDelete: "cascade" }),
  rating: real("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});