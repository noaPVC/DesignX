import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})

export class ProfileDropdownComponent implements OnInit {
  @Input() dropdownActive : boolean = false;
  @Output() dropdownActiveChanged = new EventEmitter<boolean>();

  ngOnInit(): void {}

  closeDropdown() : void {
    this.dropdownActive = false;
    this.dropdownActiveChanged.emit(false);
  }
}

