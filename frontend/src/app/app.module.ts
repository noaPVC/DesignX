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
import { environment } from 'src/environments/environment';
import { FullnamePipe } from './pipes/user/fullname/fullname.pipe';
import { ImageUrlSourcePipe } from './pipes/user/image-url-source/image-url-source.pipe';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/ui-items/checkbox/checkbox.component';

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
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    AuthService,
    { provide: "BASE_URL", useValue: environment.baseUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
