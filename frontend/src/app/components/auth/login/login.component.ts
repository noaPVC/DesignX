import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRememberMe: boolean = false
  loadedDelayer: boolean = false

  // error handler conditions
  unknownError: boolean = false
  invalidCredentialsError: boolean = false

  @ViewChild('loginForm', { read: NgForm }) form: any

  constructor(private router: Router, private authService: AuthService, private userService: UserService, public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.tryRedirectToDashboard()
    setTimeout(() => this.loadedDelayer = true, 100)
  }

  login() {
    if(!this.form.valid) return

    this.authService.login(this.form.value.usernameOrEmail, this.form.value.password)
      .subscribe(response => this.handleResponse(response),
                 err => this.handleError(err))
  }

  tryRedirectToDashboard() {
    if(localStorage.getItem('token') && localStorage.getItem('user'))
      this.router.navigateByUrl('/dashboard/home')
  }

  handleResponse(response: any) {
    this.clearErrors()

    localStorage.setItem('token', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)

    this.userService.initialize(response.user)
    this.tryRedirectToDashboard()
  }

  handleError(error: any) {
    this.clearErrors()

    if(error.status == 0 || error.status == 500)
      this.unknownError = true

    if(error.status == 400)
      this.invalidCredentialsError = true
  }

  clearErrors() {
    this.unknownError = false
    this.invalidCredentialsError = false
  }

  rememberMeChanged(args: boolean) {
    this.isRememberMe = args
  }
}
