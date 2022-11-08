import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMovieDto } from '@movie-rating-app/api-interfaces';

@Component({
  selector: 'movie-rating-app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  newMovieForm: FormGroup;

  @Output() createMovieDto = new EventEmitter<CreateMovieDto>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newMovieForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      director: ['', [Validators.required]],
      year: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
    });
  }

  onSubmit(): void {
    const { title, director, year } = this.newMovieForm.value;

    if (!title?.trim() || !director || !year) {
      return;
    }

    const movie: CreateMovieDto = {
      title,
      director,
      year: Number(year),
    };

    this.createMovieDto.emit(movie);
  }

  onClear() {
    this.newMovieForm.reset();
  }
}
