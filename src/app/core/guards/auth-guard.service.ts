import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const url: string = state.url;
    if (this.authService.isAuthenticated) {
      return true;
    } else {
      this.authService.redirectUrl = url;
      this.router.navigate(['/receipts/register']);
      return false;
    }
  }
}
