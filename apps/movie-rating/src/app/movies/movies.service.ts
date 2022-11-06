import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMovieDto,
  Movie,
  UpdateMovieDto,
} from '@movie-rating-app/api-interfaces';
import { catchError, Observable } from 'rxjs';
import { EnvironmentService } from '../shared/data-access/environment/environment.service';

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
    return this.http.get<Movie>(this.genUrl(id)).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 404) {
            throw new Error('Could not find movie');
          }
        }

        throw new Error('Something went wrong');
      })
    );
  }

  findAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.genUrl()).pipe(
      catchError(() => {
        throw new Error('Something went wrong');
      })
    );
  }

  create(payload: CreateMovieDto): Observable<Movie> {
    return this.http.post<Movie>(this.genUrl(), payload).pipe(
      catchError(() => {
        throw new Error('Something went wrong');
      })
    );
  }

  update(id: Movie['id'], updateMovieDto: UpdateMovieDto): Observable<Movie> {
    return this.http.patch<Movie>(this.genUrl(id), updateMovieDto).pipe(
      catchError(() => {
        throw new Error('Something went wrong');
      })
    );
  }

  remove(id: Movie['id']): Observable<Movie> {
    return this.http.delete<Movie>(this.genUrl(id)).pipe(
      catchError(() => {
        throw new Error('Something went wrong');
      })
    );
  }
}
