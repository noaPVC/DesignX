import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modal-image-cropper',
  templateUrl: './modal-image-cropper.component.html',
  styleUrls: ['./modal-image-cropper.component.scss']
})
export class ModalImageCropperComponent implements OnInit {
  lastCropped: string | null | undefined = null
  isCropperReady: boolean = false

  @Input() modalShown: boolean = false
  @Input() cropperTitle: string = 'Adjust your image'
  @Input() imageChangedEvent: any = null

  @Output() modalStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() cropperBase64Result: EventEmitter<string | null> = new EventEmitter<string | null>()

  constructor() { }

  ngOnInit(): void {}

  // component library contained triggers

  cropped(event: ImageCroppedEvent) {
    this.lastCropped = event.base64
  }

  cropperReady() {
    this.isCropperReady = true
  }

  // action triggers

  proceedAction() {
    this.cropperBase64Result.emit(this.lastCropped)

    this.modalStateChanged.emit(false)
    this.lastCropped = null
  }

  cancelAction() {
    this.modalStateChanged.emit(false)
    this.lastCropped = null
  }
}
