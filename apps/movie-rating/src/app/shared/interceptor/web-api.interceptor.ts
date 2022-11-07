import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../data-access/environment/environment.service';

@Injectable()
export class WebApiInterceptor implements HttpInterceptor {
  constructor(private environmentService: EnvironmentService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith('/')) {
      const webApiBaseUrl = this.environmentService.env.WEB_API_BASE_URL;

      const decoratedUrl = webApiBaseUrl + req.url;

      const clonedRequest = req.clone({
        url: decoratedUrl,
      });

      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}
