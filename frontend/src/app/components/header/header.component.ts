import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  profileOptionsExpanded : boolean = false

  constructor() {}

  ngOnInit(): void {}

  showProfileOptions() : void {
    this.profileOptionsExpanded = true
  }

  profileOptionsChanged(newDropdownChangedArgs : boolean) : void {
    this.profileOptionsExpanded = newDropdownChangedArgs
  }
}
