import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';

const appRoutes: Route[] = [
  {
    path: 'movies',
    pathMatch: 'full',
    component: MoviesComponent,
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
