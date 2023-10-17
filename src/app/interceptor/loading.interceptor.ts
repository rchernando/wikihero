import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading-service/loading.service';
import { GET_METHOD } from '../data/constants/common.constants';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly _loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.method !== GET_METHOD) this._loadingService.changeLoading(true);
    return next.handle(req).pipe(
      finalize(() => {
        this._loadingService.changeLoading(false);
      })
    );
  }
}
