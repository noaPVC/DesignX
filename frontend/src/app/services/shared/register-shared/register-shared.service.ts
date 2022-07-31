import { Injectable } from '@angular/core';
import { UserAuthDto } from 'src/app/models/dtos/user-auth.dto';
import { RegistrationForm } from 'src/app/models/forms/registration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterSharedService {
  // caching values so they don't have to be validated each step cycle
  username: string = ''
  email: string = ''

  registrationData: RegistrationForm
  profileAvatarFile: File | null | undefined

  constructor() {
    this.registrationData = environment.defaults.registrationForm
    this.profileAvatarFile = null
  }

  buildUserAuthDto(): UserAuthDto  {
    let avatarUpload = null

    if(this.profileAvatarFile)
      avatarUpload = this.profileAvatarFile

    return {
      firstname: this.registrationData.firstname,
      lastname: this.registrationData.lastname,
      username: this.registrationData.username,
      email: this.registrationData.email,
      bio: this.registrationData.bio,
      password: this.registrationData.password,
      avatar: avatarUpload
    }
  }

  usernameEmailUnchanged(username: string, email: string) {
    if(this.username == username && this.email == email) return true

    this.username = username
    this.email = email

    return false
  }

  resetUsernameEmail() {
    this.username = ''
    this.email = ''
  }

  dispose() {
    this.registrationData = environment.defaults.registrationForm
    this.profileAvatarFile = null
  }
}
