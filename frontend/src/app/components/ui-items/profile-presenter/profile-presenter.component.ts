import { Component, EventEmitter, HostListener, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-presenter',
  templateUrl: './profile-presenter.component.html',
  styleUrls: ['./profile-presenter.component.scss']
})
export class ProfilePresenterComponent implements OnInit, OnChanges {
  colorValueBackground: string = this.pickRandomColor()
  savedBackgroundColor: string = this.colorValueBackground

  @Input() size: number = 45
  @Input() iconSize: number = 25
  @Input() source: string | null | undefined = `${environment.baseUrl}${this.userService.user.avatarProfileSource}`
  @Input() allowCursorPointer: boolean = false
  @Input() isEditMode: boolean = false

  @Output() imageEdited: EventEmitter<void> = new EventEmitter<void>()
  @Output() imageRemoved: EventEmitter<void> = new EventEmitter<void>()
  @Output() presenterClicked: EventEmitter<void> = new EventEmitter<void>()

  constructor(private userService: UserService) {}

  @HostListener('click')
  onClick() {
    this.presenterClicked.emit()
  }

  ngOnInit(): void {
    const savedColor = localStorage.getItem('sharedAccountColor')
    if(!savedColor)
      return localStorage.setItem('sharedAccountColor', this.colorValueBackground)

    this.setSharedColor(savedColor)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.colorValueBackground = this.source && !this.source.endsWith('null') ? '#0000' : this.savedBackgroundColor
  }

  setSharedColor(color: string) {
    this.colorValueBackground = color
    this.savedBackgroundColor = this.colorValueBackground

    this.colorValueBackground = this.source && !this.source.endsWith('null') ? '#0000' : this.savedBackgroundColor
  }

  edit(event: any) {
    event.stopPropagation()
    this.imageEdited.emit()
  }

  remove(event: any) {
    event.stopPropagation()
    this.imageRemoved.emit()
  }

  pickRandomColor(): string {
    const colors: string[] = ['#E6E6FA', '#fff1e1', '#F7D2E1', '#a2d5c6', '#12a4d9', '#ffc13b', '#5c3c92', '#d9a5b3', '#1868ae', '#c6d7eb', '#77c593']
    const randIdx = Math.floor(Math.random() * colors.length)

    return colors[randIdx]
  }
}
