import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'movie-rating-app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent {
  @Input() isLoading: boolean;
  @Output() searchParam = new EventEmitter();

  onSearch(value: string) {
    this.searchParam.emit(value);
  }
}
