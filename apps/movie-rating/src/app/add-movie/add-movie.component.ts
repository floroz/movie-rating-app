import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateMovieDto } from '@movie-rating-app/api-interfaces';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { MoviesService } from '../movies/data-access/movies.service';
import { MovieFormComponent } from './movie-form/movie-form.component';

@Component({
  selector: 'movie-rating-app-add-movie',
  template: `
    <div class="layout">
      <a routerLink="../">Back To Movies</a>
      <h1>Add a new movie</h1>
      <movie-rating-app-movie-form
        (createMovieDto)="onCreateMovie($event)"
      ></movie-rating-app-movie-form>
    </div>
  `,
  styles: [
    `
      a {
        display: block;
        margin: 4rem 0;
      }
      .layout {
        padding: 4rem;
      }
    `,
  ],
})
export class AddMovieComponent implements OnInit {
  @ViewChild(MovieFormComponent) private movieFormComp: MovieFormComponent;

  private createMovieSubject = new Subject<CreateMovieDto>();

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.createMovieSubject
      .pipe(
        switchMap((createMovie) => this.movieService.create(createMovie)),
        catchError(() => {
          // handle error
          return of();
        }),
        tap(() => {
          this.movieFormComp.onClear();
        })
      )
      .subscribe((movie) => {
        // again, a notification/toast would be nice here
        alert(`Movie ${movie.title} created.`);
      });
  }

  onCreateMovie(movieDto: CreateMovieDto) {
    this.createMovieSubject.next(movieDto);
  }
}
