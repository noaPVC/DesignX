import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ToastType } from 'src/app/enums/toast-type.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnChanges {
  @Input() message: string = ''
  @Input() show: boolean = false
  @Input() duration: number = 3000
  @Input() toastType: ToastType = ToastType.Message
  @Input() allowManualRemove: boolean = true

  @Output() showChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  icon: string = ''
  showIcon: boolean = false
  color: string = 'var(--primary-color)'
  background: string = 'var(--background-color)'

  constructor() { }

  ngOnInit(): void {
    switch (this.toastType) {
      case ToastType.Message:
        this.showIcon = false
        this.color = 'var(--primary-color)'
        this.background = 'var(--background-color)'
        break;

      case ToastType.Info:
        this.showIcon = true
        this.icon = 'information'
        this.color = 'var(--primary-color)'
        this.background = 'var(--background-color)'
        break;

      case ToastType.Success:
        this.showIcon = true
        this.icon = 'check'
        this.color = 'var(--primary-color)'
        this.background = 'var(--background-color)'
        break;

      case ToastType.Warning:
        this.showIcon = true
        this.icon = 'alert'
        this.color = 'var(--primary-warning)'
        this.background = 'var(--primary-warning-background)'
        break;

      case ToastType.Error:
        this.showIcon = true
        this.icon = 'error-warning'
        this.color = 'var(--primary-error)'
        this.background = 'var(--primary-error-background)'
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.show) {
      setTimeout(() => {
        this.show = false
        this.showChanged.emit(false)
      }, this.duration)
    }
  }

  remove() {
    this.show = false
    this.showChanged.emit(false)
  }
}
