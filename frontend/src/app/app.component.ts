import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { ToastService } from './services/notification/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterContentChecked {

  constructor(public router : Router, private changeRef: ChangeDetectorRef, public toastService: ToastService) {}

  sideRoutes : string[] = [
    '/authenticate/login',
    '/authenticate/register',
    '/user/account',
    '/user/settings',
    '/**'
  ];

  ngOnInit() : void {}

  // prevent outlet from passing animation on non existing route data/content
  ngAfterContentChecked(): void {
    this.changeRef.detectChanges();
  }

  // definitons concerning router outlet animations
  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated)
      return outlet.activatedRoute.snapshot.url

    return null
  }

  toastVisibilityChanged(args: boolean) {
    this.toastService.isShown = args
  }
}
