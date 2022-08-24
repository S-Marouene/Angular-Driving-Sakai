import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { TokenService } from './token.service';
import { catchError, NEVER, Observable, throwError } from 'rxjs';
import { AuthStateService } from './auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    router: any;

    constructor(private tokenService: TokenService,
        private auth: AuthStateService,) { }

    intercept(req: HttpRequest<any>, next: HttpHandler)  {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer" + accessToken
            }
        });
        //return next.handle(req);


        //new update a voir pour delete token and redirect to
        //login page if is unauthorized
        // solution from https://stackoverflow.com/questions/64877273/angular-redirect-page-if-http-response-is-401
        //By said marouene

        return next.handle(req).pipe(catchError(error => {
            if (!!error.status && error.status === 401) {
                this.auth.setAuthState(false);
                localStorage.clear();
                this.router.navigate(['pages/login']);
              return NEVER;
            }
            return throwError(error);
          }));


    }

}
