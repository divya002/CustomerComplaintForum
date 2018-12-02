
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class Auth2Service implements CanActivate{
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isAuthenticated===false) {
      return true;
    } 
  }

}
