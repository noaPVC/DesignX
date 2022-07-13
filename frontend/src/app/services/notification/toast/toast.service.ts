import { Injectable } from '@angular/core';
import { ToastType } from 'src/app/enums/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  isShown: boolean = false
  type: ToastType = ToastType.Message
  message: string = ''
  allowManualRemove: boolean = true
  duration: number = 3000

  constructor() { }

  new(type: ToastType, message: string, allowManualRemove: boolean = true, duration: number = 3000) {
    this.type = type
    this.message = message
    this.allowManualRemove = allowManualRemove
    this.duration = duration
    this.isShown = true
  }
}
