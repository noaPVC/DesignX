import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(@Inject('BASE_URL') private baseUrl: string) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = localStorage.getItem('token')
    const route = request.url

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      },
      url: this.baseUrl.concat(route)
    })

    return next.handle(request);
  }
}
