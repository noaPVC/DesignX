import { Component, OnInit } from '@angular/core'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  profileOptionsExpanded : boolean = false
  mobileNavigationExpanded: boolean = false

  constructor() {}

  ngOnInit(): void {}

  newDesign() {}

  // profile-dropdown handlers
  showProfileOptions() : void {
    this.profileOptionsExpanded = true
  }

  profileOptionsChanged(newDropdownChangedArgs : boolean) : void {
    this.profileOptionsExpanded = newDropdownChangedArgs
  }

  // mobile navigation handlers
  toggleMobileNavigation() : void {
    this.mobileNavigationExpanded = !this.mobileNavigationExpanded
  }

  mobileNavigationStateChanged(args: boolean) : void {
    this.mobileNavigationExpanded = args
  }
}
