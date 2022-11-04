import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMoviePayload,
  DeleteMoviePayload,
  Movie,
  UpdateMoviePayload,
} from '@movie-rating-app/api-interfaces';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesApiUrl: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.moviesApiUrl = this.environment.getConfig().apiUrl + '/movies';
  }

  find(id: Movie['id']): Observable<Movie> {
    const url = `${this.moviesApiUrl}/${id}`;
    return this.http.get<Movie>(url);
  }

  findAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesApiUrl);
  }

  create(payload: CreateMoviePayload): Observable<Movie> {
    return this.http.post<Movie>(this.moviesApiUrl, payload);
  }

  update({ id, ...rest }: UpdateMoviePayload): Observable<Movie> {
    const url = `${this.moviesApiUrl}/${id}`;
    return this.http.put<Movie>(url, rest);
  }

  delete({ id }: DeleteMoviePayload): Observable<Movie> {
    const url = `${this.moviesApiUrl}/${id}`;
    return this.http.delete<Movie>(url);
  }
}
