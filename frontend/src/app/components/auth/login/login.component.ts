import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loadedDelayer: boolean = false
  isRememberMe: boolean = false

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.tryRedirectToDashboard()
    setTimeout(() => this.loadedDelayer = true, 400);
  }

  login(form: NgForm) {
    this.authService.login(form.value.usernameOrEmail, form.value.password).subscribe(response => {
      if(response)
        this.handleResponse(response)
    })
  }

  handleResponse(response: any) {
    localStorage.setItem('token', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)

    this.userService.initialize(response.user)
    this.tryRedirectToDashboard()
  }

  tryRedirectToDashboard() {
    if(localStorage.getItem('token') && localStorage.getItem('user')) {
      this.router.navigateByUrl('/dashboard/home')
    }
  }

  rememberMeChanged(args: boolean) {
    this.isRememberMe = args
    console.log(this.isRememberMe)
  }
}
