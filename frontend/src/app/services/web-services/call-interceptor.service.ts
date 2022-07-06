import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
// important interceptor, relevant regarding loaders in our app, if any api requests are ongoing the
// behaviour of our loading service isLoading will be updated. Therefore this service.
export class CallInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true)
    return next.handle(req).pipe(finalize(() => this.loaderService.isLoading.next(false)))
  }
}
