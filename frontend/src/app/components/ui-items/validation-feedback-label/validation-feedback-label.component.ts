import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-validation-feedback-label',
  templateUrl: './validation-feedback-label.component.html',
  styleUrls: ['./validation-feedback-label.component.scss'],
  animations: [
    trigger(
      'animateInOut',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('200ms ease-in',
                    style({ height: 100, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 100, opacity: 1 }),
            animate('200ms ease-out',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ValidationFeedbackLabelComponent implements OnInit {
  @Input() showError: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
