import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User
  isLoggedIn: boolean = false

  constructor(httpClient : HttpClient) {
    if(localStorage.getItem('user')) {

      const storedUser = localStorage.getItem('user')
      this.user = JSON.parse(storedUser ?? '')
      this.isLoggedIn = true

      return
    }

    this.user = { firstname: 'User', lastname: 'Not found', username: 'unknownuser', email: 'usernotfound@gmail.com', avatarProfileSource: null, bio: '-', joined: Date.now().toString() }
  }

  initialize(user: User) : void {
    this.user = user
    localStorage.setItem('user', JSON.stringify(this.user))
    this.isLoggedIn = true
  }

  dispose() : void {
    this.user = { firstname: 'User', lastname: 'Not found', username: 'unknownuser', email: 'usernotfound@gmail.com', avatarProfileSource: null, bio: '-', joined: Date.now().toString() }
    this.isLoggedIn = false
    localStorage.clear()
  }

  // TODO: add some more functions, set profile, bio, banner, verify, etc.
}
