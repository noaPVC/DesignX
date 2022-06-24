import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public router : Router) {}

  sideRoutes : string[] = [
    '/authenticate/login',
    '/authenticate/register',
    '/user/profile',
    '/user/settings',
    '/**'
  ];

  ngAfterViewInit() : void {
    console.log('view was loaded');
  }
}
