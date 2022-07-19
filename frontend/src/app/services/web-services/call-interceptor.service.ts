import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
// important interceptor, relevant regarding loaders in our app, if any api requests are ongoing the
// behaviour of our loading service isLoading will be updated.
export class CallInterceptorService implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url

    if(this.reqEqual(url, '/user/current'))
      this.loadingService.dashboardLoading.next(true)

    if(this.reqEqual(url, '/auth/login') || this.reqEqual(url, '/auth/register') || this.reqEqual(url, '/user/username/email/exists'))
      this.loadingService.authLoading.next(true)

    return next.handle(req).pipe(finalize(() => this.loadingService.resetSubjectBehaviours()))
  }

  reqEqual = (url: string, relative: string) => url.endsWith(relative)
}
