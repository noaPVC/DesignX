import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-presenter',
  templateUrl: './profile-presenter.component.html',
  styleUrls: ['./profile-presenter.component.scss']
})
export class ProfilePresenterComponent implements OnInit {
  // resusability of profile presenter of any user

  @Input() size: number = 45
  @Input() source: string | null = this.userService.user.avatarProfileSource
  @Input() allowCursorPointer: boolean = false

  @Output() presenterClicked: EventEmitter<void> = new EventEmitter<void>()

  constructor(private userService: UserService) {}

  @HostListener('click')
  onClick() {
    this.presenterClicked.emit()
  }

  ngOnInit(): void {
  }
}
