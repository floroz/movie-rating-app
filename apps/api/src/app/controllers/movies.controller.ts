import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

import { Movie, MoviePayload } from '@movie-rating-app/api-interfaces';

import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MovieService) {}

  private throwNotFoundException() {
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }

  @Post()
  createMovie(@Body() moviePayload: MoviePayload): Movie {
    this.moviesService.createMovie(moviePayload);

    try {
      const newMovie = this.moviesService.createMovie(moviePayload);
      return newMovie;
    } catch (error) {
      //
    }
  }

  @Put() updateMovie(
    @Body()
    {
      id,
      moviePayload,
    }: {
      id: Movie['id'];
      moviePayload: Partial<MoviePayload>;
    }
  ): Movie {
    try {
      const updatedMovie = this.moviesService.updateMovie(id, moviePayload);
      return updatedMovie;
    } catch (error) {
      this.throwNotFoundException();
    }
  }

  @Delete() deleteMovie(@Body() { id }: { id: Movie['id'] }) {
    try {
      const deletedMovie = this.moviesService.deleteMovie(id);
      return deletedMovie;
    } catch (error) {
      this.throwNotFoundException();
    }
  }
}
