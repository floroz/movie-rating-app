import { Movie, MoviePayload } from '@movie-rating-app/api-interfaces';
import { Injectable } from '@nestjs/common';
import { movies_db } from '../../in-memory-db';

@Injectable()
export class MovieService {
  getMovies(): Movie[] {
    return Object.values(movies_db);
  }

  private throwMovieNotFound(): never {
    throw new Error('Movie not found');
  }

  getMovie(id: string): Movie {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    return movie;
  }

  createMovie(movieData: MoviePayload): Movie {
    /**
     * Let's imagine here we have validation to ensure that a new movie that has the same title, director and year of release cannot be added.
     */

    const id = String(Math.random() * 100);

    const movie: Movie = {
      ...movieData,
      id,
      createdAt: new Date().toISOString(),
      rating: 0,
    };

    movies_db[id] = movie;

    return movie;
  }

  updateMovie(movieId: Movie['id'], movieData: Partial<MoviePayload>): Movie {
    const movie = movies_db[movieId];

    if (!movie) {
      this.throwMovieNotFound();
    }

    const updatedMovie: Movie = {
      ...movie,
      ...movieData,
      createdAt: movie.createdAt,
      id: movie.id,
      updatedAt: new Date().toISOString(),
    };

    movies_db[movieId] = updatedMovie;

    return updatedMovie;
  }

  deleteMovie(movieId: Movie['id']): Movie {
    const movie = movies_db[movieId];

    if (!movie) {
      this.throwMovieNotFound();
    }

    delete movies_db[movieId];

    return movie;
  }

  // calculateAverageRating(movieId: Movie['id']) {}
}
