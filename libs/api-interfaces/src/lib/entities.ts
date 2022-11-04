interface Entity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Movie extends Entity {
  title: string;
  directedBy: string;
  releaseYear: number;
  rating: number;
}

export interface User extends Entity {
  email: string;
}
