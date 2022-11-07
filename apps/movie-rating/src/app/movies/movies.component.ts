import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Movie } from '@movie-rating-app/api-interfaces';
import { Observable, Subscription, tap } from 'rxjs';
import { MoviesService } from './movies.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/ui/confirmation-dialog.component';
import { MoviesTableComponent } from './movies-table/movies-table.component';
@Component({
  selector: 'movie-rating-app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  @ViewChild(MoviesTableComponent)
  private moviesTableComp: MoviesTableComponent;

  movies$: Observable<Movie[]>;

  subscriptionManager: Subscription[] = [];

  constructor(private movieService: MoviesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.findAll();
  }

  ngOnDestroy(): void {
    this.subscriptionManager.forEach((sub) => sub.unsubscribe());
  }

  onDeleteMovie(movie: Movie) {
    this.openDialog(movie);
  }

  private removeMovie(id: Movie['id']) {
    /**
     * Opportunities for UX improvements: Optimistic UI Updates
     * we remove the item from the list before we receive BE confirmation
     * so that the user feels the update is immediate.
     *
     * If BE sends an error, we rollback to the previous list and refresh the table
     * (and inform the user something wen wrong via tost/notification system)
     */
    const deleteMovieSub = this.movieService
      .remove(id)
      .pipe(
        tap(() => {
          this.movies$ = this.movieService.findAll();
        })
      )
      .subscribe(() => {
        this.moviesTableComp.onRefresh();
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
