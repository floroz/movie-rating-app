export interface CreateMovieDto {
  title: string;
  directedBy: string;
  releaseYear: number;
}

export type UpdateMovieDto = Partial<CreateMovieDto>;
