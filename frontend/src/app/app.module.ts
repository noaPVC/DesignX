import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileDropdownComponent } from './components/modal-essentials/profile-dropdown/profile-dropdown.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SavedComponent } from './components/pages/saved/saved.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './components/pages/user/settings/settings.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/error-handlers/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AccountComponent } from './components/pages/user/account/account.component';
import { ProfilePresenterComponent } from './components/ui-items/profile-presenter/profile-presenter.component';
import { InterceptorService } from './services/web-services/client/interceptor.service';
import { FullnamePipe } from './pipes/user/fullname/fullname.pipe';
import { ImageUrlSourcePipe } from './pipes/user/image-url-source/image-url-source.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/ui-items/checkbox/checkbox.component';
import { ValidationFeedbackLabelComponent } from './components/ui-items/validation-feedback-label/validation-feedback-label.component';
import { CallInterceptorService } from './services/web-services/call-interceptor.service';
import { LoaderComponent } from './components/ui-items/loader/loader.component';
import { ToastComponent } from './components/ui-items/toast/toast.component';
import { DateAgoPipe } from './pipes/dateAgo/date-ago.pipe';
import { DashboardComponent } from './components/skeletons/dashboard/dashboard.component';
import { RecentComponent } from './components/pages/home/recent/recent.component';
import { RecentItemComponent } from './components/design/recent-item/recent-item.component';
import { MobileNavigationComponent } from './components/header/mobile-navigation/mobile-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileDropdownComponent,
    HomeComponent,
    SavedComponent,
    ExploreComponent,
    GalleryComponent,
    FooterComponent,
    AccountComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ProfilePresenterComponent,
    FullnamePipe,
    ImageUrlSourcePipe,
    CheckboxComponent,
    ValidationFeedbackLabelComponent,
    LoaderComponent,
    ToastComponent,
    DateAgoPipe,
    DashboardComponent,
    RecentComponent,
    RecentItemComponent,
    MobileNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CallInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
