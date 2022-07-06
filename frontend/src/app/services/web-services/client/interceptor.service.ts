import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = environment.baseUrl

    const accessToken = localStorage.getItem('token')
    const route = request.url

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      },
      url: baseUrl.concat(route)
    })

    return next.handle(request);
  }
}
