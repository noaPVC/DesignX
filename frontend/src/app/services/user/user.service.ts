import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User
  isLoggedIn: boolean

  constructor(httpClient : HttpClient) {
    this.isLoggedIn = false
    this.user = { firstname: 'User', lastname: 'Not found', username: 'unknownuser', email: 'usernotfound@gmail.com', avatarProfileSource: '', bio: '-', joined: Date.now().toString() }
  }

  initialize(user: User) : void {
    this.user = user
  }

  dispose() : void {
    this.user = { firstname: 'User', lastname: 'Not found', username: 'unknownuser', email: 'usernotfound@gmail.com', avatarProfileSource: '', bio: '-', joined: Date.now().toString() }
  }
}
