import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = { firstname: 'User', lastname: 'Not found', email: 'usernotfound@gmail', bio: '-', avatarProfileSource: null, username: 'usernotfound', joined: new Date().toString() }
  isLoggedIn: boolean = false

  constructor(private httpClient : HttpClient, private router: Router) {
    if(localStorage.getItem('token') && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') ?? '')
      return
    }

    this.router.navigateByUrl('/authenticate/login')
    this.dispose()
  }

  initialize(user: User) : void {
    this.user = user
    this.isLoggedIn = true

    this.updateLocalValues()
  }

  requestUserData = () : Observable<any> => this.httpClient.get<any>('/user/current')

  userAlreadyExists = (usernameOrEmail: string) : Observable<any> => this.httpClient.post<any>('/user/username/email/exists', { key: usernameOrEmail })

  updateLocalValues() : void {
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  dispose() : void {
    this.isLoggedIn = false
    this.user = { firstname: 'User', lastname: 'Not found', email: 'usernotfound@gmail', bio: '-', avatarProfileSource: null, username: 'usernotfound', joined: new Date().toString() }
    localStorage.clear()
  }
}
