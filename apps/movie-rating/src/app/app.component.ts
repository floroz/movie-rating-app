import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '@movie-rating-app/api-interfaces';

@Component({
  selector: 'movie-rating-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Movie[]>('/api/movies');
  constructor(private http: HttpClient) {}
}
