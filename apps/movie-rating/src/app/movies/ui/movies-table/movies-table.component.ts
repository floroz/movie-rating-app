import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Movie } from '@movie-rating-app/api-interfaces';

@Component({
  selector: 'movie-rating-app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss'],
})
export class MoviesTableComponent {
  @ViewChild('table') table: MatTable<Movie>;

  displayedColumns = ['title', 'year', 'director', 'rating', 'delete'];

  @Input() movies: Movie[];
  @Output() deleteMovie = new EventEmitter<Movie>();
  @Output() selectMovie = new EventEmitter<Movie>();

  onRefresh() {
    this.table.renderRows();
  }

  onDeleteRow(movie: Movie) {
    this.deleteMovie.emit(movie);
  }

  onSelectRow(movie: Movie) {
    this.selectMovie.emit(movie);
  }
}
