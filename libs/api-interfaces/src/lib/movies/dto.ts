import { PartialType, PickType } from '@nestjs/mapped-types';
import { Movie } from './movie.entity';
export class CreateMovieDto extends PickType(Movie, [
  'title',
  'director',
  'year',
]) {}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
