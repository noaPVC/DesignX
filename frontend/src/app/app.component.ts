import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { UserService } from './services/user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [

        // required sudo selectors animation preparation
        query(':enter, :leave', [
          style({
            position: 'absolute',
            opacity: 0,
            top: 0,
            left: 0
          })
        ], { optional: true }),

        query(':leave', [
          animate('300ms ease', style({
            opacity: '0',
            left: '-100%'
          }))
        ], { optional: true }),

        query(':enter', [
          animate('300ms ease', style({
            opacity: '1'
          }))
        ], { optional: true })
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  constructor(public router : Router, private userService : UserService) {}

  sideRoutes : string[] = [
    '/authenticate/login',
    '/authenticate/register',
    '/user/account',
    '/user/settings',
    '/**'
  ];

  ngOnInit() : void {

    const user = {
      firstname: 'Noa',
      lastname: 'Perkovic',
      username: 'noapvc_',
      email: 'n04.perkovic@gmail.com',
      avatarProfileSource: 'https://avatars.githubusercontent.com/u/76920918?v=4',
      bio: 'I love to code in my freetime, currently building this plattform as well called DesignX.',
      joined: Date.now().toString()
    }

    this.userService.initialize(user)
  }

  // definitons concerning router outlet animations
  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated)
      return outlet.activatedRoute.snapshot.url

    return
  }
}
