import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './services/loading/loading.service';
import { ToastService } from './services/notification/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {
  private refreshTokenInterval: any

  constructor(public router : Router, private changeRef: ChangeDetectorRef, public toastService: ToastService, public loadingService: LoadingService,
    private authService: AuthService) {}

  sideRoutes : string[] = [
    '/authenticate/login',
    '/authenticate/register',
    '/user/account',
    '/user/settings',
    '/**'
  ]

  ngOnInit() : void {
    this.refreshTokenInterval = setInterval(() => this.authService.refreshTokens(), environment.refreshTokensTimeSpan)
  }

  // prevent outlet from passing animation on non existing route data/content
  ngAfterContentChecked(): void {
    this.changeRef.detectChanges()
  }

  // definitons concerning router outlet animations
  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated)
      return outlet.activatedRoute.snapshot.url

    return null
  }

  ngOnDestroy() : void {
    clearInterval(this.refreshTokenInterval)
  }
}
