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
  isLoggedIn: boolean = false

  constructor(private httpClient : HttpClient, private router: Router) {
    if(localStorage.getItem('token')) {
      // check token validity
      this.checkSessionValid().subscribe(result => {
        this.user = result.user
        this.router.navigateByUrl('/authenticate/login')
      }, err => {
        this.dispose()
        this.router.navigateByUrl('/authenticate/login')
      })
    }
  }

  initialize(user: User) : void {
    this.user = user
    this.isLoggedIn = true
  }

  checkSessionValid = () : Observable<any> => this.httpClient.get<any>('/user/current')

  userAlreadyExists = (usernameOrEmail: string) : Observable<any> => this.httpClient.post<any>('/user/username/email/exists', { key: usernameOrEmail })

  dispose() : void {
    this.isLoggedIn = false
    this.user = { _id: null, firstname: 'User', lastname: 'Not found', email: 'usernotfound@gmail', bio: '-', avatarProfileSource: null, username: 'usernotfound', joined: new Date().toString() }
    localStorage.clear()
  }
}
