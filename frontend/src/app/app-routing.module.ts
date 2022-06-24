import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/error-handlers/page-not-found/page-not-found.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SavedComponent } from './components/pages/saved/saved.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SettingsComponent } from './components/pages/user/settings/settings.component';

const routes: Routes = [
  // redirection from base route
  { path: '', redirectTo:'/authenticate/login', pathMatch:'full' },

  // auth related routes
  { path: 'authenticate/login', component: LoginComponent },
  { path: 'authenticate/register', component: RegisterComponent },

  // user access pages
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/settings', component: SettingsComponent },

  // dashboard related main pages
  { path: 'dashboard/home', component: HomeComponent },
  { path: 'dashboard/saved', component: SavedComponent },
  { path: 'dashboard/explore', component: ExploreComponent },
  { path: 'dashboard/gallery', component: GalleryComponent },

  // error related routing
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
