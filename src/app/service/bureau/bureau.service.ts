import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/api/appconfig';
import { Bureau } from 'src/app/model/bureau.model';

@Injectable({
  providedIn: 'root'
})
export class BureauService {

    constructor(private http: HttpClient) { }

    getBureaux(): Observable<Bureau[]> {
        return this.http.get<Bureau[]>(API.Listbureau)
    }

    getBureauxByID(id: number): Observable<Bureau> {
        return this.http.get<Bureau>(API.getbureauByID + id)
    }

    register(Bureau): Observable<any> {
        return this.http.post(API.add_bureau, Bureau);
    }

    destroy(Bureau:any) : Observable<any> {
        return this.http.delete(API.Deletebureau + Bureau.id );
    }

    update_Bur(Bureau:any,id:any) : Observable<any> {
        return this.http.put(API.updatebureau + id ,Bureau);
    }
}
