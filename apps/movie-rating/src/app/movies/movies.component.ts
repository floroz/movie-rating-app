import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '@movie-rating-app/api-interfaces';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { MoviesService } from './movies.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/ui/confirmation-dialog.component';
import { MovieForm } from './movie-form/movies-form.types';
@Component({
  selector: 'movie-rating-app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[];

  subscriptionManager: Subscription[] = [];

  constructor(private movieService: MoviesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const moviesSub = this.movieService.findAll().subscribe((movies) => {
      this.movies = movies;
    });

    this.subscriptionManager.push(moviesSub);
  }

  ngOnDestroy(): void {
    this.subscriptionManager.forEach((sub) => sub.unsubscribe());
  }

  onSubmit(formData: MovieForm) {
    console.log(formData);
  }

  onDeleteMovie(movie: Movie) {
    this.openDialog(movie);
  }

  private copyMovies() {
    return [...this.movies];
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

  private openDialog(movie: Movie): void {
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
}
