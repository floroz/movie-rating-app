import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMovieDto,
  Movie,
  UpdateMovieDto,
} from '@movie-rating-app/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly apiRoute = '/movies/';

  constructor(private http: HttpClient) {}

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
