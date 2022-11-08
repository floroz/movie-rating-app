import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMovieDto,
  Movie,
  UpdateMovieDto,
} from '@movie-rating-app/api-interfaces';
import { map, Observable } from 'rxjs';
import { isMovieMatch } from '../utils/movie-match.util';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  $movies: Observable<Movie[]>;

  private readonly apiRoute = '/movies/';

  constructor(private http: HttpClient) {}

  /**
   * This implementation should be handled by the BE.
   * The '/api/movies' endpoint should support a ?search= query param
   * (or an equivalent solution).
   *
   * For the purpose of this example, we would move the searching logic to this functionality.
   */
  search(search: string): Observable<Movie[]> {
    const mapFunctionThatShouldLiveInBackend = (movies: Movie[]) =>
      movies.filter((movie) => isMovieMatch(search, movie));

    return this.findAll().pipe(map(mapFunctionThatShouldLiveInBackend));
  }

  find(id: Movie['id']): Observable<Movie> {
    return this.http.get<Movie>(this.apiRoute + id);
  }

  findAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiRoute);
  }

  create(payload: CreateMovieDto): Observable<Movie> {
    return this.http.post<Movie>(this.apiRoute, payload);
  }

  update(id: Movie['id'], updateMovieDto: UpdateMovieDto): Observable<Movie> {
    return this.http.patch<Movie>(this.apiRoute + id, updateMovieDto);
  }

  remove(id: Movie['id']): Observable<Movie> {
    return this.http.delete<Movie>(this.apiRoute + id);
  }
}
