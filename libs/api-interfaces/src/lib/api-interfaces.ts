import { Movie, User } from './entities';

interface Rating {
  score: number;
  userId: User['id'];
  movieId: Movie['id'];
}

export interface Ratings {
  movieId: Movie['id'];
  averageScore: number;
  ratings: Rating[];
}

export interface CreateMoviePayload {
  title: string;
  directedBy: string;
  releaseYear: number;
}

export type UpdateMoviePayload = {
  id: Movie['id'];
} & Partial<CreateMoviePayload>;

export type DeleteMoviePayload = Pick<Movie, 'id'>;
