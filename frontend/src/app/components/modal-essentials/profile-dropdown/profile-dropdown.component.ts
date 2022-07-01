import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})

export class ProfileDropdownComponent implements OnInit {
  @Input() dropdownActive : boolean = false;
  @Output() dropdownActiveChanged = new EventEmitter<boolean>();

  // dependend on account-info-wrapper
  user: User

  constructor(userService: UserService) {
    this.user = userService.user
  }

  ngOnInit(): void {}

  closeDropdown() : void {
    this.dropdownActive = false;
    this.dropdownActiveChanged.emit(false);
  }
}
