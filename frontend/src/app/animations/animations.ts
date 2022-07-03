import { trigger, transition, group, style, query, animate } from '@angular/animations'

export const fade = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter, :leave', [style({ opacity: 0, position: 'absolute', top: 0, left: 0 })], {
      optional: true,
    }),

    query(':leave',
      [
        style({ opacity: 1 }),
        animate('100ms ease-out', style({ opacity: 0 })),
      ],
      { optional: true }
    ),

    query(':enter',
      [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 })),
      ],
      { optional: true }
    )]
  )
])
