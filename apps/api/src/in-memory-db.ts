import { Movie, User } from '@movie-rating-app/api-interfaces';

export const movies_db: Record<Movie['id'], Movie> = {
  '1': {
    title: 'Batman Returns',
    releaseYear: 1995,
    rating: 4,
    directedBy: 'Tim Burton',
    id: '1',
    createdAt: new Date(2022, 6, 1).toISOString(),
  },
};

// export const ratings_db: Record<Movie['id'], Rating> = {
//   '1': {
//     movieId: '1',
//     averageScore: 4,
//     ratings: [{ score: 4, userId: '1' }],
//   },
// };

export const users_db: Record<User['id'], User> = {
  '1': {
    id: '1',
    email: 'john@googlecom',
    createdAt: new Date().toISOString(),
  },
};
