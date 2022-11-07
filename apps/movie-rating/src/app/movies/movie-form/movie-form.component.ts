import { Component, EventEmitter, Output } from '@angular/core';
import { MovieForm } from './movies-form.types';

@Component({
  selector: 'movie-rating-app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent {
  @Output() formData = new EventEmitter<MovieForm>();

  onSubmit(): void {
    this.formData.emit();
  }

  onClear() {
    //
  }
}
