import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderType } from 'src/app/enums/loader.enum';
import { ToastType } from 'src/app/enums/toast-type.enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file/file.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/notification/toast/toast.service';
import { RegisterSharedService } from 'src/app/services/shared/register-shared/register-shared.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/shared/validation/validation.service';

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

  cropperImageEvent: any = null
  cropperModalShown: boolean = false

  constructor(private titleService: Title, private authService: AuthService, private userService: UserService, public loadingService: LoadingService,
                private router: Router, private registerSharedService: RegisterSharedService, private toastService: ToastService,
                  private fileService: FileService, private validationService: ValidationService) {}

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
      this.registerSharedService.resetUsernameEmail()

      if(!result.error) {
        this.router.navigateByUrl('/authenticate/login')
        this.toastService.new(ToastType.Success, 'Account was successfully created!', false)
        return
      }

      this.router.navigateByUrl('/authenticate/login')
      this.toastService.new(ToastType.Error, 'Something went wrong, try again later...', false)
    })
  }

  // replace observable checks (eg: userAlready exists, has changed or password confirmations inside dedicated validators)
  next() {
    if(this.registrationStep == 1) {
      if(this.signUpForm.invalid)
        return this.handlePreErrors()

      if(this.signUpForm.get('password')?.value != this.signUpForm.get('passwordConfirmation')?.value)
        return this.issueError('Password and confirmation are unequal!')

      // validating if username or email already exist
      const username = this.signUpForm.get('username')?.value
      const email = this.signUpForm.get('email')?.value

      if(!this.registerSharedService.usernameEmailUnchanged(username, email)) {

        this.userService.userAlreadyExists(username).subscribe(result => {
          if(result.exists) {
            this.registrationStep = 1

            this.registerSharedService.resetUsernameEmail()
            return this.issueError(`Username "${username}", is already taken..`)
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

    this.issueSignUp()
  }

  back() {
    this.clearError()
    if(this.registrationStep == 2)
      return this.registrationStep = 1

    return this.router.navigateByUrl('/authenticate/login')
  }

  // avatar handlers

  handleAvatarFileUpload(event: any) {
    const data = this.fileService.imageUpload(event.target.files, 1)
    if(data.error) return this.issueError(data.message)

    this.clearError()
    this.cropperImageEvent = event
    this.cropperModalShown = true
  }

  cropperResult(event: any) {
    // showing the cropped image to the user
    this.avatarSourceUrl = event

    this.fileService.urlToFile(event, 'avatar.png', 'image/png')
      .then(file => this.registerSharedService.profileAvatarFile = file)
  }

  cropperModalStateChanged(args: boolean) {
    this.cropperModalShown = args
  }

  // image presenter remove function was triggered

  removedImage(fileuploadInput: any) {
    fileuploadInput.value = null
    this.avatarSourceUrl = null
    this.cropperImageEvent = null
    this.registerSharedService.profileAvatarFile = null
  }

  // error handlers

  handlePreErrors() {
    this.clearError()

    const invalidControls = this.validationService.findInvalidControls(this.signUpForm)
    invalidControls.forEach((control: string) => this.signUpForm.controls[control].markAsTouched())

    if(invalidControls.length >= 2)
      this.issueError('Fields cannot be empty!')
    else if(invalidControls.length == 1) {
      if(this.validationService.getControlError(this.signUpForm, invalidControls[0], 'required'))
        this.issueError('Field cannot be empty!')
    }

    if(this.validationService.getControlError(this.signUpForm, 'firstname', 'minlength'))
      this.issueError('Firstname too short.')

    if(this.validationService.getControlError(this.signUpForm, 'lastname', 'minlength'))
      this.issueError('Lastname too short.')

    if(this.validationService.getControlError(this.signUpForm, 'username', 'minlength'))
      this.issueError('Your username is too short, it has to be at least 5 characters long.')

    if(this.validationService.getControlError(this.signUpForm, 'email', 'minlength'))
      this.issueError('Your email is too short')

    if(this.validationService.getControlError(this.signUpForm, 'email', 'email'))
      this.issueError('Your email seems to be invalid..')

    if(this.validationService.getControlError(this.signUpForm, 'password', 'minlength'))
      this.issueError('Password has to be at least 8 characters long.')

    if(this.validationService.getControlError(this.signUpForm, 'passwordConfirmation', 'minlength'))
      this.issueError('Password Confirmation has to be at least 8 characters long.')
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
