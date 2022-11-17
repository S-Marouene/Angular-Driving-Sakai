import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { API } from 'src/environments/environment';
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
    status:JSON;

    register(user): Observable<any> {
        return this.http.post(API.usersRegister, user);
    }

    signin(user): Observable<any> {
        return this.http.post(API.login, user,{responseType:'text', params:user, observe: 'response'}).pipe(map(data => {
            return JSON.parse(data.body);
        }));
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

    GetMenubyrole() {
        return this.http.get(API.GetRolePermission)
    }

    changepsw(pwd){
        return this.http.post(API.changepaswd,pwd,{responseType:'text', params:pwd, observe: 'response'}).pipe(map(data => {
            return JSON.parse(data.body);
        }));
      }

}
