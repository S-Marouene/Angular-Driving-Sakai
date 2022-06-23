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
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private Token: TokenService) {}

    tokenresp: any;

    register(user: User): Observable<any> {
        return this.http.post(API.usersRegister, user);
    }

    signin(user: User): Observable<any> {
        return this.http.post<any>(API.login, user);
    }

    me(token: any): Observable<any> {
        return this.http.post<any>(API.me, token);
    }

    profileUser(): Observable<any> {
        return this.http.get(API.userProfile);
    }

    GetToken() {
        return localStorage.getItem("auth_token") || '';
    }

    GetRolebyToken(token: any) {
        let _token = token.split('.')[1];
        this.tokenresp = JSON.parse(atob(_token));
        return this.tokenresp.role;
    }

    /* GetMenubyrole(role: any) {
        return this.http.get(this.GetRole + 'GetMenubyRole/' + role)
    } */
}
