import { Movie, User } from '@movie-rating-app/api-interfaces';

export const movies_db: Record<Movie['id'], Movie> = {
  '1': {
    title: 'Batman Returns',
    year: 1992,
    rating: {
      totalVotes: 132,
      score: 7.1,
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
      score: 7.5,
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
      score: 8.2,
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
      score: 5.4,
    },
    director: 'Joel Schumacher',
    id: '4',
    createdAt: new Date(2022, 6, 3).toISOString(),
  },
  '5': {
    title: 'Batman & Robin',
    year: 1997,
    rating: {
      totalVotes: 112,
      score: 3.7,
    },
    director: 'Joel Schumacher',
    id: '5',
    createdAt: new Date(2022, 6, 5).toISOString(),
  },
  '6': {
    title: 'The Dark Knight',
    year: 2008,
    rating: {
      totalVotes: 112,
      score: 9,
    },
    director: 'Christopher Nolan',
    id: '6',
    createdAt: new Date(2022, 6, 5).toISOString(),
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
