import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.tryRedirectToDashboard()
  }

  // WORK ON LOGIN
  login() {
    this.authService.login('billie_123', 'password123ED').subscribe(response => {
      if(response.user) {
        this.userService.initialize(response.user)
        this.tryRedirectToDashboard()
      }
    })
  }

  tryRedirectToDashboard() {
    if(this.userService.isLoggedIn && localStorage.getItem('token')) {
      // prevent user from going back
      this.router.navigateByUrl('/dashboard/home')
    }
  }
}
