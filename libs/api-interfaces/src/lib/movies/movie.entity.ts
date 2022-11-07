import { Entity } from '../entities';

interface Rating {
  score: number;
  totalVotes: number;
}

export class Movie extends Entity {
  title: string;
  director: string;
  year: number;
  rating: Rating;
}
