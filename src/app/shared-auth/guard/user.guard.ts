import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Injectable({
    providedIn: 'root',
})
export class UserGuard implements CanActivate {
    currentrole: any;
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        if (this.tokenService.isLoggedIn()) {
            this.currentrole = this.authService.GetRolebyToken(this.authService.GetToken());
                if (this.currentrole == 'super-admin') {
                    return true;
                }else {
                    alert('not authorised to visit this URL');
                    this.router.navigate(['dashboard']);
                    return false;
                }
        } else {
            this.router.navigate(['pages/login']);
            return false;
        }
    }
}
