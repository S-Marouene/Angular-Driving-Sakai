import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { User } from '../model/users.model';
import { TokenService } from './token.service';


/* export class User {
    name!: String;
    email!: String;
    password!: String;
    password_confirmation!: String;
  } */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        private Token:TokenService,
        ) {}
    // User registration
    register(user: User): Observable<any> {
      return this.http.post(API.usersRegister, user);
    }
    // Login
    signin(user: User): Observable<any> {
      return this.http.post<any>(API.login, user);
    }

    me(token:any): Observable<any> {
        return this.http.post<any>('http://127.0.0.1/Driving/backend/api/auth/me',token);
    }

    // Access user profile
    profileUser(): Observable<any> {
      return this.http.get('http://127.0.0.1/Driving/backend/api/auth/user-profile');
    }

    private _updatemenu = new Subject<void>();

    get updatemenu() {
        return this._updatemenu;
    }
}
