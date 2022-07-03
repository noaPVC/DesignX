import { Injectable } from '@angular/core'
import { HttpClient, HttpStatusCode } from '@angular/common/http'
import { UserService } from '../user/user.service'
import { UserAuthDto } from 'src/app/models/dtos/user-auth.dto'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient : HttpClient, private router: Router, private userService: UserService) { }

  login(usernameOrEmail: string, password: string) : Observable<any> {
    const payload = {
      usernameOrEmail: usernameOrEmail,
      password: password
    }

    const observableAuth = this.httpClient.post<any>('/auth/login', payload)

    observableAuth.subscribe(response => {
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
    })

    return observableAuth
  }

  register(userRegisterData: UserAuthDto) : boolean {
    const payloadFormData = new FormData()

    payloadFormData.append('firstname', userRegisterData.firstname)
    payloadFormData.append('lastname', userRegisterData.lastname)
    payloadFormData.append('username', userRegisterData.username)
    payloadFormData.append('email', userRegisterData.email)
    payloadFormData.append('bio', userRegisterData.bio)
    payloadFormData.append('password', userRegisterData.password)

    if(userRegisterData.avatar)
      payloadFormData.append('avatar', userRegisterData.avatar, userRegisterData.avatar.name)

    this.httpClient.post<HttpStatusCode>('/auth/register', payloadFormData)
      .subscribe(statusCode => {
        if(statusCode == HttpStatusCode.Ok)
          return true

        return false
      })

    return false
  }

  renewPassword(newPassword: string) : void {

  }

  logout() : void {
    this.userService.dispose()
    history.pushState(null, '')
    this.router.navigateByUrl('/authenticate/login')
  }
}
