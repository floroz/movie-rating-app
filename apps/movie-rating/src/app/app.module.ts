import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MoviesComponent } from './movies/movies.component';
import { MoviesTableComponent } from './movies/ui/movies-table/movies-table.component';
import { WebApiInterceptor } from './shared/interceptor/web-api.interceptor';
import { EnvironmentService } from './shared/data-access/environment/environment.service';
import { MovieFormComponent } from './add-movie/movie-form/movie-form.component';
import { RatingDialogComponent } from './movies/ui/rating-dialog/rating-dialog.component';
import { ConfirmationDialogComponent } from './shared/ui/confirmation-dialog.component';
import { MovieSearchComponent } from './movies/ui/movie-search/movie-search.component';
import { AppRoutingModule } from './app-routing.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesTableComponent,
    MovieFormComponent,
    RatingDialogComponent,
    ConfirmationDialogComponent,
    MovieSearchComponent,
    AddMovieComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebApiInterceptor,
      multi: true,
      deps: [EnvironmentService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
