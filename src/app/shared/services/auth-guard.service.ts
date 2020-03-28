import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AccountService, public router: Router) {}

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
