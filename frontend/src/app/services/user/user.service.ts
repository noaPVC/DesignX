import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = environment.defaults.user
  keepLoggedIn: boolean = false
  isLoggedIn: boolean = false

  constructor(private httpClient : HttpClient, private router: Router) {
    // on browser refresh
    const keepLoggedIn = JSON.parse(localStorage.getItem('keepLoggedIn') ?? 'false')

    if(localStorage.getItem('token') && keepLoggedIn) {
      this.checkSessionValid().subscribe(result => {
        this.user = result.user
        this.isLoggedIn = true
        this.keepLoggedIn = keepLoggedIn

        this.router.navigateByUrl('/authenticate/login')
      }, err => {
        this.dispose()
        this.router.navigateByUrl('/authenticate/login')
      })
    } else {
      this.dispose()
      this.router.navigateByUrl('/authenticate/login')
    }
  }

  initialize(user: User, keepLoggedIn: boolean) : void {
    this.user = user
    this.isLoggedIn = true
    this.keepLoggedIn = keepLoggedIn
  }

  checkSessionValid() : Observable<any> {
    return this.httpClient.get<any>('/user/current')
  }

  userAlreadyExists(usernameOrEmail: string) : Observable<any> {
    return this.httpClient.post<any>('/user/username/email/exists', { key: usernameOrEmail })
  }

  dispose() : void {
    this.user = environment.defaults.user
    this.isLoggedIn = false
    localStorage.clear()
  }
}
