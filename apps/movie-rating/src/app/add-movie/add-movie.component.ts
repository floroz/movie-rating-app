import { Component, OnInit } from '@angular/core';
import { Movie } from '@movie-rating-app/api-interfaces';
import { MoviesService } from '../movies/data-access/movies.service';

@Component({
  selector: 'movie-rating-app-add-movie',
  template: `
    <div class="layout">
      <a routerLink="../">Back To Movies</a>
      <h1>Add a new movie</h1>
      <movie-rating-app-movie-form></movie-rating-app-movie-form>
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
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {}

  onClear() {}

  onSubmit() {
    const movie = {} as Movie;

    this.movieService
      .create(movie)
      .pipe()
      .subscribe(() => {
        this.onClear();
      });
  }
}
