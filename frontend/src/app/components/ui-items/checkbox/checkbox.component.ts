import { Component, EventEmitter, Host, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  checked: boolean = false

  @Output() checkedValue: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  @HostListener('click')
  onClick() {
    this.checked = !  this.checked
    this.checkedValue.emit(this.checked)
  }

  ngOnInit(): void {
  }

}
