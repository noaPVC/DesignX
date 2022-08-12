import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderType } from 'src/app/enums/loader.enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loader: LoaderType = LoaderType.SpinnerSmooth

  isRememberMe: boolean = false
  loadedDelayer: boolean = false
  showPassword: boolean = false

  isError: boolean = false
  errorMessage: string = ''

  @ViewChild('loginForm', { read: NgForm }) form: any

  constructor(private router: Router, private authService: AuthService, private userService: UserService,
      public loadingService: LoadingService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('DesignX')

    this.tryRedirectToDashboard()
    setTimeout(() => this.loadedDelayer = true, 100)
  }

  login() {
    if(!this.form.valid) {
      this.handlePreErrors()
      return
    }

    this.authService.login(this.form.value.usernameOrEmail, this.form.value.password)
      .subscribe({
        next: (response) => this.handleResponse(response),
        error: (err) => this.handleError(err)
      })
  }

  tryRedirectToDashboard() {
    if(localStorage.getItem('token'))
      this.router.navigateByUrl('/dashboard/home')
  }

  handleResponse(response: any) {
    this.clearError()
    const { accessToken, refreshToken, user } = response

    localStorage.setItem('token', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('keepLoggedIn', this.isRememberMe.toString())

    this.userService.initialize(user, this.isRememberMe)
    this.tryRedirectToDashboard()
  }

  handleError(error: any) {
    this.clearError()

    if(error.status == 0 || error.status == 500)
      this.issueError('Something went wrong... Try again later.')

    if(error.status == 400)
      this.issueError('Invalid credentials.')
  }

  handlePreErrors() : void {
    this.clearError()

    let formControls = this.form.controls

    if(formControls.password.invalid && formControls.usernameOrEmail.invalid) {
      formControls.usernameOrEmail.touched = true
      formControls.password.touched = true

      this.issueError('Fields cannot be empty!')
      return
    }

    if(formControls.usernameOrEmail.invalid) {
      formControls.usernameOrEmail.touched = true

      this.issueError('Email or username cannot be empty!')
      return
    }

    if(formControls.password.invalid) {
      formControls.password.touched = true

      this.issueError('Password cannot be empty!')
    }
  }

  issueError(message: string) {
    this.isError = true
    this.errorMessage = message
  }

  clearError() {
    this.isError = false
    this.errorMessage = ''
  }

  rememberMeChanged(args: boolean) {
    this.isRememberMe = args
  }
}
