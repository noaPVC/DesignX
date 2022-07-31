import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modal-image-cropper',
  templateUrl: './modal-image-cropper.component.html',
  styleUrls: ['./modal-image-cropper.component.scss']
})
export class ModalImageCropperComponent implements OnInit {
  modalShown: boolean = false
  lastCropped: string | null | undefined = ''

  @Input() cropperTitle: string = 'Adjust your image'
  @Input() imageChangedEvent: any = ''

  @Output() cropperBase64Result: EventEmitter<string | null> = new EventEmitter<string | null>()

  constructor() { }

  ngOnInit(): void {}

  cropped(event: ImageCroppedEvent) {
    this.lastCropped = event.base64
  }

  cropperReady() {
    this.modalShown = true
  }

  // action triggers

  proceedAction() {
    this.cropperBase64Result.emit(this.lastCropped)
    this.imageChangedEvent = null
    this.modalShown = false
  }

  cancelAction() {
    this.imageChangedEvent = null
    this.modalShown = false
  }
}
