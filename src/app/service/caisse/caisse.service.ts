import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { Caisse } from 'src/app/model/caisse.model';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

    constructor(private http: HttpClient) { }

    getCaisses(): Observable<Caisse[]> {
        return this.http.get<Caisse[]>(API.Listcaisse)
    }

    getCaissesByID(id: number): Observable<Caisse> {
        return this.http.get<Caisse>(API.getcaisseByID + id)
    }

    register(Caisse): Observable<any> {
        return this.http.post(API.add_caisse, Caisse);
    }

    destroy(Caisse:any) : Observable<any> {
        return this.http.delete(API.Deletecaisse + Caisse.id );
    }

    update_caisse(Caisse:any,id:any) : Observable<any> {
        return this.http.put(API.updatecaisse + id ,Caisse);
    }
}
