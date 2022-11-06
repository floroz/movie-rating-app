import { Entity } from '../entities';
import { Movie } from '../movies';

type UserRating = {
  movieId: Movie['id'];
  score: number;
};

export class User extends Entity {
  email: string;
  moviesRated: UserRating[];
}
