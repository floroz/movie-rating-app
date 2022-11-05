import { Entity } from '../entities';
import { Movie } from '../movies';

type UserRating = {
  movieId: Movie['id'];
  score: number;
};

export interface User extends Entity {
  email: string;
  moviesRated: UserRating[];
}
