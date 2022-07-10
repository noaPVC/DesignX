import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RegisterSharedService } from 'src/app/services/shared/register-shared/register-shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationStep: number = 1

  isError: boolean = false
  errorMessage: string = ''

  signUpForm: FormGroup = new FormGroup({})

  constructor(private titleService: Title, private authService: AuthService, public loadingService: LoadingService,
    private router: Router, private registerSharedService: RegisterSharedService) {}

  ngOnInit(): void {
    this.titleService.setTitle('DesignX - Register')

    this.signUpForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      bio: new FormControl(''),
      password: new FormControl(''),
      passwordConfirmation: new FormControl('')
    })
  }

  next() {
    if(this.registrationStep == 1) {
      if(this.signUpForm.invalid){
        this.handlePreErrors()
        return
      }

      if(this.signUpForm.get('password')?.value != this.signUpForm.get('passwordConfirmation')?.value) {
        this.issueError('Password and confirmation are unequal!')
        return
      }

      this.clearError()
      this.registrationStep = 2
      return
    }

    this.registerSharedService.registrationData = this.signUpForm.value
    this.registerSharedService.profileAvatarFile = null

    const user = this.registerSharedService.buildUserAuthDto()
    console.log(this.authService.register(user))
  }

  back() {
    if(this.registrationStep == 2) {
      this.registrationStep = 1
      return
    }

    this.router.navigateByUrl('/authenticate/login')
  }

  handlePreErrors() {
    this.clearError()

    const invalidControls = this.findInvalidControls(this.signUpForm)
    invalidControls.forEach((control: string) => this.signUpForm.controls[control].markAsTouched())

    if(invalidControls.length >= 2)
      this.issueError('Fields cannot be empty!')
    else if(invalidControls.length == 1) {
      if(this.getControlError(invalidControls[0], 'required'))
        this.issueError('Field cannot be empty!')
    }

    if(this.getControlError('firstname', 'minlength'))
      this.issueError('Firstname too short.')

    if(this.getControlError('lastname', 'minlength'))
      this.issueError('Lastname too short.')

    if(this.getControlError('username', 'minlength'))
      this.issueError('Your username is too short, it has to be at least 5 characters long.')

    if(this.getControlError('email', 'minlength'))
      this.issueError('Your email is too short')

    if(this.getControlError('email', 'email'))
      this.issueError('Your email seems to be invalid..')

    if(this.getControlError('password', 'minlength'))
      this.issueError('Password has to be at least 8 characters long.')

    if(this.getControlError('passwordConfirmation', 'minlength'))
      this.issueError('Password Confirmation has to be at least 8 characters long.')
  }

  findInvalidControls(form: FormGroup) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  getControlError(controlName: string, error: string) {
    return this.signUpForm.controls[controlName].getError(error)
  }

  issueError(message: string) {
    this.isError = true
    this.errorMessage = message
  }

  clearError() {
    this.isError = false
    this.errorMessage = ''
  }
}
