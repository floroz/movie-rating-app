import { Movie, User } from '@movie-rating-app/api-interfaces';

export const movies_db: Record<Movie['id'], Movie> = {
  '1': {
    title: 'Batman Returns',
    releaseYear: 1995,
    rating: {
      totalVotes: 132,
      score: 4.75,
    },
    directedBy: 'Tim Burton',
    id: '1',
    createdAt: new Date(2022, 6, 1).toISOString(),
  },
};

export const users_db: Record<User['id'], User> = {
  '1': {
    id: '1',
    email: 'john@googlecom',
    createdAt: new Date().toISOString(),
    moviesRated: [
      {
        movieId: '1',
        score: 5,
      },
    ],
  },
};
