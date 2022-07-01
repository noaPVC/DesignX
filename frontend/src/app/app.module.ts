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
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AccountComponent } from './components/pages/user/account/account.component';
import { FullnamePipe } from './pipes/user/fullname.pipe';
import { ProfilePresenterComponent } from './components/ui-items/profile-presenter/profile-presenter.component';

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
    FullnamePipe,
    ProfilePresenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
