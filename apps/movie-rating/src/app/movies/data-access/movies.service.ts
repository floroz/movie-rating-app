import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMovieDto,
  Movie,
  UpdateMovieDto,
} from '@movie-rating-app/api-interfaces';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
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
    return this.findAll().pipe(
      map((movies) => {
        return movies.filter(
          (movie) =>
            movie.director.includes(search) ||
            movie.title.includes(search) ||
            movie.year === +search
        );
      })
    );
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
    console.log('called the service');

    return this.http.delete<Movie>(this.apiRoute + id);
  }
}
