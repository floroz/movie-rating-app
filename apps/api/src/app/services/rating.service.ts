import { Movie } from '@movie-rating-app/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingService {
  addRating(id: Movie['id'], rating: number) {}

  removeRating(id: Movie['id']) {}
}
