export interface User {
  id: string;
  email: string;
}

type RatingScore = 0 | 1 | 2 | 3 | 4 | 5;

interface RatingEntry {
  score: RatingScore;
  userId: User['id'];
}

export interface Rating {
  movieId: Movie['id'];
  averageScore: RatingScore;
  ratings: RatingEntry[];
}

export interface MoviePayload {
  title: string;
  directedBy: string;
  releaseYear: number;
}

export interface Movie {
  id: string;
  title: string;
  directedBy: string;
  releaseYear: number;
  rating: RatingScore;
  createdAt: Date;
  updatedAt?: Date;
}
