import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service'
import { Observable, of } from 'rxjs'
import { User } from 'src/app/models/user.model'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(httpClient : HttpClient, userService: UserService) { }

  login() : Observable<any> {
    return new Observable<any>()
  }

  register() : Observable<User> {
    return new Observable<User>()
  }

  renewPassword() : void {

  }

  logout() : void {

  }
}
