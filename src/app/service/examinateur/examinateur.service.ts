import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { Examinateur } from 'src/app/model/examinateur.model';

@Injectable({
  providedIn: 'root'
})
export class ExaminateurService {

    constructor(private http: HttpClient) { }

    getExaminateurs(): Observable<Examinateur[]> {
        return this.http.get<Examinateur[]>(API.Listexaminateur)
    }

    getExaminateursByID(id: number): Observable<Examinateur> {
        return this.http.get<Examinateur>(API.getexaminateurByID + id)
    }

    register(Examinateur): Observable<any> {
        return this.http.post(API.add_examinateur, Examinateur);
    }

    destroy(Examinateur:any) : Observable<any> {
        return this.http.delete(API.Deleteexaminateur + Examinateur.id );
    }

    update_exam(Examinateur:any,id:any) : Observable<any> {
        return this.http.put(API.updateexaminateur + id ,Examinateur);
    }
}
