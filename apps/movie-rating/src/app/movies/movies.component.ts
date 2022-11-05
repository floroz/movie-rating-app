import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { MoviesService } from '../services/movies/movies.service';

@Component({
  selector: 'movie-rating-app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    const sub1 = this.movieService.findAll().subscribe((val) => {
      console.log('GET - find all', val);
    });
    const sub2 = this.movieService.find('1').subscribe((val) => {
      console.log('GET - find 1', val);
    });
    const sub3 = this.movieService
      .update('1', { title: 'What is this?' })
      .pipe(
        switchMap((val) => {
          console.log('PATCH - update 1 and then GET - find all', val);
          return this.movieService.findAll();
        }),
        tap((val) => {
          console.log('GET - find all', val);
        }),
        switchMap(() => this.movieService.delete('1'))
      )
      .subscribe((val) => {
        console.log('GET - find all', val);
      });

    this.subscriptions.push(sub1, sub2, sub3);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());

    this.subscriptions = [];
  }
}
