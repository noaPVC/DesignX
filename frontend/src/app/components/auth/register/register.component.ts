import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isError: boolean = false
  errorMessage: string = ''

  @ViewChild('signUpDataForm', { read: NgForm }) form: any

  constructor(private titleService: Title, private authService: AuthService, public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.titleService.setTitle('DesignX - Register')
  }

  nextSignUp() {
    console.log(this.form)
  }
}
