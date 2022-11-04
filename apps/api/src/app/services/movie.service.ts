import {
  Movie,
  CreateMoviePayload,
  DeleteMoviePayload,
  UpdateMoviePayload,
} from '@movie-rating-app/api-interfaces';
import { Injectable } from '@nestjs/common';
import { movies_db } from '../../in-memory-db';

@Injectable()
export class MovieService {
  findAll(): Movie[] {
    return Object.values(movies_db);
  }

  private throwMovieNotFound(): never {
    throw new Error('Movie not found');
  }

  findOne(id: Movie['id']): Movie {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    return movie;
  }

  create(movieData: CreateMoviePayload): Movie {
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

  update({ id, ...movieFields }: UpdateMoviePayload): Movie {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    /**
     * In a real API Service here we would need
     * schema validation to make sure that all inputs
     * are respecting the Interface Contract
     * (for example we can't just add another extra field like 'actors' or risk any malformation from the client)
     */
    const updatedMovie: Movie = {
      ...movie,
      ...movieFields,
      // restrict these properties from updates
      createdAt: movie.createdAt,
      id: movie.id,
      updatedAt: new Date().toISOString(),
    };

    movies_db[id] = updatedMovie;

    return updatedMovie;
  }

  delete({ id }: DeleteMoviePayload) {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    delete movies_db[id];

    return movie;
  }

  // calculateAverageRating(movieId: Movie['id']) {}
}
