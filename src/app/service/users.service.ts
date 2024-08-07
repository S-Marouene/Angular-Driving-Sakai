import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';


import { Product } from '../api/product';
import { User } from '../model/users.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getFakeUsers() {
        return this.http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(API.ListUsers)
    }

    deleteUserService(user:any)
    {
      return this.http.delete(API.DeleteUser+user.id);
    }

    updateUser(form)
    {
      return this.http.post(API.UpdateUser,form);
    }

    updateUserPhoto(form)
    {
      return this.http.post(API.updateImgProfile,form);
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }
}
