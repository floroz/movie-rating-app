import {
  CreateMovieDto,
  Movie,
  UpdateMovieDto,
} from '@movie-rating-app/api-interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { movies_db } from '../../in-memory-db';

@Injectable()
export class MoviesService {
  private throwMovieNotFound(): never {
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  create(createMovieDto: CreateMovieDto) {
    // Let's imagine here we have validation to ensure that a new movie that has the same title, director and year of release cannot be added.
    // Pseudo code:
    // if (movie exists) {
    //   throw new HttpException('Movie already exists', HttpStatus.CONFLICT);
    // }

    const id = String(Math.random() * 100);

    const movie: Movie = {
      ...createMovieDto,
      id,
      createdAt: new Date().toISOString(),
      rating: {
        score: 0,
        totalVotes: 0,
      },
    };

    movies_db[id] = movie;

    return movie;
  }

  findAll() {
    return Object.values(movies_db);
  }

  findOne(id: Movie['id']): Movie {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    /**
     * In a real API Service here we would need
     * schema validation to make sure that all inputs
     * are respecting the Interface Contract
     * (for example we can't just add another extra field like 'actors' or risk any malformation from the client, or manually override the ratings)
     */

    /**
     * Pseudo code
     *
     * if (!schema.validator(updateMovieDto)) {
     *   throw new HttpException('Invalid Payload', HttpStatus.BAD_REQUEST);
     * }
     */

    const updatedMovie: Movie = {
      ...movie,
      ...updateMovieDto,
      // restrict these properties from updates
      createdAt: movie.createdAt,
      id: movie.id,
      rating: movie.rating,
      updatedAt: new Date().toISOString(),
    };

    movies_db[id] = updatedMovie;

    return updatedMovie;
  }

  remove(id: string) {
    const movie = movies_db[id];

    if (!movie) {
      this.throwMovieNotFound();
    }

    delete movies_db[id];

    return movie;
  }
}
