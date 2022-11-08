import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateMovieDto } from '@movie-rating-app/api-interfaces';
import { catchError, of, Subject, Subscription, switchMap, tap } from 'rxjs';
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
export class AddMovieComponent implements OnInit, OnDestroy {
  @ViewChild(MovieFormComponent) private movieFormComp: MovieFormComponent;
  private subs: Subscription[] = [];

  private createMovieSubject = new Subject<CreateMovieDto>();

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    const sub = this.createMovieSubject
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

    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onCreateMovie(movieDto: CreateMovieDto) {
    this.createMovieSubject.next(movieDto);
  }
}
