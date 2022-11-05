import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMovieDto,
  Movie,
  UpdateMovieDto,
} from '@movie-rating-app/api-interfaces';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesApiUrl: string;

  private genUrl(id?: string) {
    return `${this.moviesApiUrl}/${id ?? ''}`;
  }

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.moviesApiUrl = this.environment.getConfig().apiUrl + '/movies';
  }

  find(id: Movie['id']): Observable<Movie> {
    return this.http.get<Movie>(this.genUrl(id));
  }

  findAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.genUrl());
  }

  create(payload: CreateMovieDto): Observable<Movie> {
    return this.http.post<Movie>(this.genUrl(), payload);
  }

  update(id: Movie['id'], updateMovieDto: UpdateMovieDto): Observable<Movie> {
    return this.http.patch<Movie>(this.genUrl(id), updateMovieDto);
  }

  delete(id: Movie['id']): Observable<Movie> {
    return this.http.delete<Movie>(this.genUrl(id));
  }
}
