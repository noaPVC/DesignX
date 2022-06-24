import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  profileOptionsExpanded : boolean;
  profileSource: string = 'https://avatars.githubusercontent.com/u/76920918?v=4';

  constructor() {
    this.profileOptionsExpanded = false;
  }

  ngOnInit(): void {}

  showProfileOptions() : void {
    this.profileOptionsExpanded = true;
  }

  profileOptionsChanged(newDropdownChangedArgs : boolean) : void {
    this.profileOptionsExpanded = newDropdownChangedArgs;
  }
}
