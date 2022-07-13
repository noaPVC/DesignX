import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})

export class ProfileDropdownComponent implements OnInit {
  @Input() dropdownActive : boolean = false;
  @Output() dropdownActiveChanged = new EventEmitter<boolean>();

  user: User

  constructor(private userService: UserService, private authService: AuthService) {
    this.user = userService.user
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout()
    this.closeDropdown()
  }

  closeDropdown() : void {
    this.dropdownActive = false;
    this.dropdownActiveChanged.emit(false);
  }
}
