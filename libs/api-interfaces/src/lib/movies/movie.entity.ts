import { Entity } from '../entities';

export interface Movie extends Entity {
  title: string;
  directedBy: string;
  releaseYear: number;
  rating: Rating;
}

interface Rating {
  score: number;
  totalVotes: number;
}
