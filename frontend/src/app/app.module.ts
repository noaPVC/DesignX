import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileDropdownComponent } from './components/modal-essentials/profile-dropdown/profile-dropdown.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SavedComponent } from './components/pages/saved/saved.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SettingsComponent } from './components/pages/user/settings/settings.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/error-handlers/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

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
    ProfileComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
