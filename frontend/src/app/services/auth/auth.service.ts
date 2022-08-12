import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service'
import { UserAuthDto } from 'src/app/models/dtos/user-auth.dto'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ToastService } from '../notification/toast/toast.service'
import { ToastType } from 'src/app/enums/toast-type.enum'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient : HttpClient, private router: Router, private userService: UserService, private toastService: ToastService) {}

  login(usernameOrEmail: string, password: string) : Observable<any> {
    const payload = {
      usernameOrEmail: usernameOrEmail,
      password: password
    }

    return this.httpClient.post<any>('/auth/login', payload)
  }

  register(userRegisterData: UserAuthDto) : Observable<any> {
    const payloadFormData = new FormData()

    payloadFormData.append('firstname', userRegisterData.firstname)
    payloadFormData.append('lastname', userRegisterData.lastname)
    payloadFormData.append('username', userRegisterData.username)
    payloadFormData.append('email', userRegisterData.email)
    payloadFormData.append('bio', userRegisterData.bio)
    payloadFormData.append('password', userRegisterData.password)

    if(userRegisterData.avatar)
      payloadFormData.append('avatar', userRegisterData.avatar, userRegisterData.avatar.name)

    return this.httpClient.post<any>('/auth/register', payloadFormData)
  }

  renewPassword(newPassword: string) : void {

  }

  refreshTokens() {
    const refreshToken = localStorage.getItem('refreshToken')
    if(!refreshToken || !this.userService.isLoggedIn) return

    if(!this.userService.keepLoggedIn) {
      this.logout()
      this.toastService.new(ToastType.Info, 'Your session ran out, please login again!', false)
      return
    }

    this.httpClient.post<any>('/auth/refreshtoken', { refreshToken: refreshToken }).subscribe({
      next: (response) => {
        const { accessToken, refreshToken } = response

        localStorage.setItem('token', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      },
      error: (err) => {
        this.logout()
        this.toastService.new(ToastType.Error, 'Something went wrong please try to login again..', false)
      }
    })
  }

  logout() : void {
    this.userService.dispose()
    this.router.navigateByUrl('/authenticate/login')
  }
}
