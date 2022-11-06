import { PartialType } from '@nestjs/mapped-types';
export class CreateMovieDto {
  title: string;
  directedBy: string;
  releaseYear: number;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
