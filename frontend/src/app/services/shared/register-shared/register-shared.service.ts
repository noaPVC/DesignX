import { Injectable } from '@angular/core';
import { UserAuthDto } from 'src/app/models/dtos/user-auth.dto';
import { RegistrationForm } from 'src/app/models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterSharedService {
  registrationData: RegistrationForm
  profileAvatarFile: File | null

  constructor() {
    this.registrationData = { firstname: '', lastname: '', username: '', email: '', bio: '', password: '', passwordConfirmation: '' }
    this.profileAvatarFile = null
  }

  buildUserAuthDto(): UserAuthDto  {
    return {
      firstname: this.registrationData.firstname,
      lastname: this.registrationData.lastname,
      username: this.registrationData.username,
      email: this.registrationData.email,
      bio: this.registrationData.bio,
      password: this.registrationData.password,
      avatar: this.profileAvatarFile
    }
  }
}
