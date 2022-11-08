import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '@movie-rating-app/api-interfaces';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { MoviesService } from './data-access/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/ui/confirmation-dialog.component';
import { MovieForm } from './ui/movie-form/movies-form.types';
import { RatingDialogComponent } from './ui/rating-dialog/rating-dialog.component';
@Component({
  selector: 'movie-rating-app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  moviesFullList: Movie[];
  movies: Movie[];

  isSearchLoading = false;

  private searchTerm = new Subject<string>();
  private subscriptionManager: Subscription[] = [];

  constructor(private movieService: MoviesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const moviesSub = this.movieService.findAll().subscribe((movies) => {
      this.moviesFullList = movies;
      this.movies = movies;
    });

    const searchSub = this.searchTerm
      .pipe(
        debounceTime(350),
        map((term) => term.trim()),
        map((term) => {
          if (!term) {
            this.movies = this.moviesFullList;
          }

          return term;
        }),
        filter(Boolean),
        distinctUntilChanged(),
        switchMap((term) => {
          this.isSearchLoading = true;

          return this.movieService.search(term);
        })
      )
      .subscribe((movies) => {
        this.isSearchLoading = false;
        this.movies = movies;
      });

    this.subscriptionManager.push(moviesSub, searchSub);
  }

  ngOnDestroy(): void {
    this.subscriptionManager.forEach((sub) => sub.unsubscribe());
  }

  onSubmit(formData: MovieForm) {
    console.log(formData);
  }

  onSelectMovie(movie: Movie) {
    this.openRatingDialog(movie);
  }

  onDeleteMovie(movie: Movie) {
    this.openDeleteDialog(movie);
  }
  onSearch(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }

  private copyMovies() {
    return [...this.moviesFullList];
  }

  /**
   * In a real world scenario, we would be using a NotificationService.
   */
  private notifyUser(message: string) {
    alert(message);
  }

  /**
   * Optimistic UI Updates ---
   * we remove the item from the list before we receive BE confirmation
   * so that the user feels the update is immediate.
   *
   * If BE sends an error, we rollback to the previous list and refresh the table
   * (and inform the user something wen wrong via tost/notification system)
   */
  private optimisticUpdateDelete(id: Movie['id']) {
    this.movies = this.movies.filter((m) => m.id !== id);
  }

  private removeMovie(id: Movie['id']) {
    const moviesCopy = this.copyMovies();

    this.optimisticUpdateDelete(id);

    const deleteMovieSub = this.movieService
      .remove(id)
      .pipe(
        catchError(() => {
          this.notifyUser(
            'Oops.. something went wrong when trying to deleting the movie'
          );
          this.movies = moviesCopy;
          return of();
        }),
        switchMap(() => this.movieService.findAll())
      )
      .subscribe((updatedMovies) => {
        this.movies = updatedMovies;
      });

    this.subscriptionManager.push(deleteMovieSub);
  }

  private optimisticUpdateRating(id: Movie['id'], rating: number) {
    this.moviesFullList.forEach((movie) => {
      if (movie.id === id) {
        movie.rating.score = rating;
      }
    });
  }

  private updateMovieRating(id: string, rating: number) {
    const moviesCopy = this.copyMovies();

    this.optimisticUpdateRating(id, rating);

    this.movieService
      .update(id, {
        rating: rating,
      })
      .pipe(
        catchError(() => {
          this.movies = moviesCopy;
          this.moviesFullList = moviesCopy;

          return of(null);
        }),
        filter(Boolean),
        switchMap(() => {
          return this.movieService.findAll();
        })
      )
      .subscribe((movies) => {
        this.moviesFullList = movies;
        this.movies = movies;
      });
  }

  private openDeleteDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Are you sure you want to delete ${movie.title}?`,
        subTitle: 'This action is irreversible',
      },
    });

    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.removeMovie(movie.id);
      }
    });
  }

  private openRatingDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      data: movie,
    });
    dialogRef.afterClosed().subscribe((rating) => {
      if (typeof rating === 'number') {
        this.updateMovieRating(movie.id, rating);
      }
    });
  }
}
