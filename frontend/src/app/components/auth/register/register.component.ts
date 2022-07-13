import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderType } from 'src/app/enums/loader.enum';
import { ToastType } from 'src/app/enums/toast-type.enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/notification/toast/toast.service';
import { RegisterSharedService } from 'src/app/services/shared/register-shared/register-shared.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationStep: number = 1
  loader: LoaderType = LoaderType.Spinner

  isError: boolean = false
  errorMessage: string = ''

  signUpForm: FormGroup = new FormGroup({})
  avatarSourceUrl: string | undefined | null = null

  constructor(private titleService: Title, private authService: AuthService, private userService: UserService, public loadingService: LoadingService,
    private router: Router, private registerSharedService: RegisterSharedService, private toastService: ToastService) {}

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

  issueSignUp() {
    this.registerSharedService.registrationData = this.signUpForm.value
    const user = this.registerSharedService.buildUserAuthDto()

    this.authService.register(user).subscribe(result => {
      if(!result.error) {
        this.router.navigateByUrl('/authenticate/login')
        this.toastService.new(ToastType.Success, 'Account was successfully created!', false)
        return
      }

      this.router.navigateByUrl('/authenticate/login')
      this.toastService.new(ToastType.Error, 'Something went wrong, try again later...', false)
    })
  }

  next() {
    if(this.registrationStep == 1) {
      if(this.signUpForm.invalid)
        return this.handlePreErrors()

      if(this.signUpForm.get('password')?.value != this.signUpForm.get('passwordConfirmation')?.value)
        return this.issueError('Password and confirmation are unequal!')

      // validating if username or email already exist
      const username = this.signUpForm.get('username')?.value
      const email = this.signUpForm.get('email')?.value

      if(!this.registerSharedService.usernameEmailUnchanged(username, email)){
        this.userService.userAlreadyExists(username).subscribe(result => {
          if(result.exists) {
            this.registrationStep = 1
            this.registerSharedService.resetUsernameEmail()
            return this.issueError(`User with username "${username}", already exists..`)
          }
        })

        this.userService.userAlreadyExists(email).subscribe(result => {
          if(result.exists) {
            this.registrationStep = 1
            this.registerSharedService.resetUsernameEmail()
            return this.issueError(`User with email "${email}", already exists..`)
          }
        })
      }

      this.clearError()
      this.registrationStep = 2
      return
    }

    // valdation passed
    this.issueSignUp()
  }

  back() {
    this.clearError()

    if(this.registrationStep == 2)
      return this.registrationStep = 1

    return this.router.navigateByUrl('/authenticate/login')
  }

  handleAvatarFileUpload(event: any) {
    const files: FileList = event.target.files

    // select at least one file
    if(files.length <= 0)
      return this.issueError('No file selected.')

    // only images
    const file: File | null = files.item(0)
    if (!file?.type.match(/image\/*/))
      return this.issueError('Only image files are allowed!')

    // max file size 1 MB
    if(file.size > 1000000)
      return this.issueError('File is too large, make sure it is smaller than 1MB!')

    this.clearError()
    this.registerSharedService.profileAvatarFile = file

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (_event) => this.avatarSourceUrl = reader.result?.toString()
  }

  removedImage() {
    this.registerSharedService.profileAvatarFile = null
    this.avatarSourceUrl = null
  }

  // error handlers and validators

  handlePreErrors() {
    this.clearError()

    const invalidControls = this.findInvalidControls(this.signUpForm)
    invalidControls.forEach((control: string) => this.signUpForm.controls[control].markAsTouched())

    if(invalidControls.length >= 2)
      this.issueError('Fields cannot be empty!')
    else if(invalidControls.length == 1) {
      if(this.getControlError(invalidControls[0], 'required')) this.issueError('Field cannot be empty!')
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

  ngOnDestroy(): void {
    this.registerSharedService.dispose()
  }
}
