import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service'
import { AuthInterceptorService } from './auth-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Auth2Service } from './auth2.service';



const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent ,canActivate: [Auth2Service] },
  { path: 'login', component: LoginComponent ,canActivate: [Auth2Service]  },
  { path: 'forget-password', component: ForgetPasswordComponent ,canActivate: [Auth2Service]  },
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }


]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    Auth2Service
  ],
  declarations: []
})
export class AppRoutingModule { }
