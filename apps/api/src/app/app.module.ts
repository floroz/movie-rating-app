import { Module } from '@nestjs/common';

import { MoviesController } from './controllers/movies.controller';
import { MovieService } from './services/movie.service';
import { RatingService } from './services/rating.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MovieService, RatingService],
})
export class AppModule {}
