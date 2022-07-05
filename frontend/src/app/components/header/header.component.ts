import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  profileSource: string | null
  profileOptionsExpanded : boolean = false

  constructor(private userService: UserService) {
    this.profileSource = this.userService.user.avatarProfileSource
  }

  ngOnInit(): void {}

  showProfileOptions() : void {
    this.profileOptionsExpanded = true
  }

  profileOptionsChanged(newDropdownChangedArgs : boolean) : void {
    this.profileOptionsExpanded = newDropdownChangedArgs
  }
}
