import { Movie, User } from '@movie-rating-app/api-interfaces';

export const movies_db: Record<Movie['id'], Movie> = {
  '1': {
    title: 'Batman Returns',
    year: 1992,
    rating: {
      totalVotes: 132,
      score: 4.75,
    },
    director: 'Tim Burton',
    id: '1',
    createdAt: new Date(2022, 6, 1).toISOString(),
  },
  '2': {
    title: 'Batman',
    year: 1989,
    rating: {
      totalVotes: 132,
      score: 4.12,
    },
    director: 'Tim Burton',
    id: '2',
    createdAt: new Date(2022, 6, 2).toISOString(),
  },
  '3': {
    title: 'Batman Begins',
    year: 2005,
    rating: {
      totalVotes: 132,
      score: 4.89,
    },
    director: 'Christopher Nolan',
    id: '3',
    createdAt: new Date(2022, 6, 2).toISOString(),
  },
  '4': {
    title: 'Batman Forever',
    year: 1995,
    rating: {
      totalVotes: 112,
      score: 4.62,
    },
    director: 'Joel Schumacher',
    id: '4',
    createdAt: new Date(2022, 6, 3).toISOString(),
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
