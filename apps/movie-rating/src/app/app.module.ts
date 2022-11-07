import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MoviesComponent } from './movies/movies.component';
import { MoviesTableComponent } from './movies/movies-table/movies-table.component';
import { WebApiInterceptor } from './shared/interceptor/web-api.interceptor';
import { EnvironmentService } from './shared/data-access/environment/environment.service';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesTableComponent,
    MovieFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
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
