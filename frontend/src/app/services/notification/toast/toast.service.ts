import { Injectable } from '@angular/core';
import { ToastType } from 'src/app/enums/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  type: ToastType = ToastType.Message
  message: string = ''
  allowManualRemove: boolean = true
  duration: number = 3000
  isShown: boolean = false

  constructor() { }

  new(type: ToastType, message: string, allowManualRemove: boolean = true, duration: number = 3000) {
    this.type = type
    this.message = message
    this.allowManualRemove = allowManualRemove
    this.duration = duration
    this.isShown = true
  }

  shownChanged(args: boolean) {
    this.isShown = args
  }
}
