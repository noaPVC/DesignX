import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {
  @Input() expanded: boolean = false
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  user: User

  constructor(private userService: UserService, public authService: AuthService) {
    this.user = this.userService.user
  }

  @HostListener('window:scroll')
  onScroll() {
    if(this.expanded)
      this.collapse()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth > 625)
      this.collapse()
  }

  ngOnInit(): void {}

  collapse() {
    this.expanded = false
    this.expandedChanged.emit(false)
  }
}
