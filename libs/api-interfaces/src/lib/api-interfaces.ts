interface Entity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface User extends Entity {
  email: string;
}

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

export interface MoviePayload {
  title: string;
  directedBy: string;
  releaseYear: number;
}

export interface Movie extends Entity {
  title: string;
  directedBy: string;
  releaseYear: number;
  rating: number;
}
