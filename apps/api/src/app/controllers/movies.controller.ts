import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateMoviePayload,
  Movie,
  UpdateMoviePayload,
} from '@movie-rating-app/api-interfaces';

import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MovieService) {}

  private throwNotFoundException() {
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Get()
  findAll(): Movie[] {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Movie['id']): Movie {
    return this.moviesService.findOne(id);
  }

  @Post()
  create(@Body() moviePayload: CreateMoviePayload): Movie {
    this.moviesService.create(moviePayload);

    try {
      const newMovie = this.moviesService.create(moviePayload);
      return newMovie;
    } catch (error) {
      throw new HttpException('Invalid Payload', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id') update(
    @Param('id') id: string,
    @Body()
    payload: UpdateMoviePayload
  ): Movie {
    try {
      const updatedMovie = this.moviesService.update({
        id,
        ...payload,
      });
      return updatedMovie;
    } catch (error) {
      this.throwNotFoundException();
    }
  }

  @Delete(':id') delete(@Param('id') id: string) {
    try {
      const deletedMovie = this.moviesService.delete({ id });
      return deletedMovie;
    } catch (error) {
      this.throwNotFoundException();
    }
  }
}
