import { Movie } from '@movie-rating-app/api-interfaces';

export function isMovieMatch(term: string, movie: Movie) {
  term = term.toLowerCase();
  const hasDirector = movie.director.toLowerCase().includes(term);
  const hasTitle = movie.title.toLowerCase().includes(term);
  const hasYear = String(movie.year).toLowerCase().includes(term);
  return hasDirector || hasTitle || hasYear;
}
