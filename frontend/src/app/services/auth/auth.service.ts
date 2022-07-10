import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http'
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

    return this.httpClient.post<any>('/auth/login', payload)
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
    else payloadFormData.append('avarar', '')

    this.httpClient.post<HttpResponse<any>>('/auth/register', payloadFormData)
      .subscribe(response => {
        if(response.status == 200)
          return true

        return false
      })

    return false
  }

  renewPassword(newPassword: string) : void {

  }

  refreshToken() {

  }

  logout() : void {
    this.userService.dispose()
    this.router.navigateByUrl('/authenticate/login')
  }
}
