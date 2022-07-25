import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = { _id: null, firstname: 'User', lastname: 'Not found', email: 'usernotfound@gmail', bio: '-', avatarProfileSource: null, username: 'usernotfound', joined: new Date().toString() }
  keepLoggedIn: boolean = false

  constructor(private httpClient : HttpClient, private router: Router) {
    if(localStorage.getItem('token')) {
      // check token validity
      this.checkSessionValid().subscribe(result => {
        this.user = result.user
        this.keepLoggedIn = localStorage.getItem('keepLoggedIn') ? true : false
        this.router.navigateByUrl('/authenticate/login')
      }, err => {
        this.dispose()
        this.router.navigateByUrl('/authenticate/login')
      })
    }
  }

  initialize(user: User, keepLoggedIn: boolean) : void {
    this.user = user
    this.keepLoggedIn = keepLoggedIn
  }

  checkSessionValid() : Observable<any> {
    return this.httpClient.get<any>('/user/current')
  }

  userAlreadyExists(usernameOrEmail: string) : Observable<any> {
    return this.httpClient.post<any>('/user/username/email/exists', { key: usernameOrEmail })
  }

  dispose() : void {
    this.user = { _id: null, firstname: 'User', lastname: 'Not found', email: 'usernotfound@gmail', bio: '-', avatarProfileSource: null, username: 'usernotfound', joined: new Date().toString() }
    localStorage.clear()
  }
}
