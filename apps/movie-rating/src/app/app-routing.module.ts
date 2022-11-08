import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MoviesComponent } from './movies/movies.component';

const appRoutes: Route[] = [
  {
    path: 'movies',
    pathMatch: 'full',
    component: MoviesComponent,
  },
  {
    path: 'movies/new',
    component: AddMovieComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/movies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
