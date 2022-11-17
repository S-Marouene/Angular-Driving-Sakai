import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { Moniteur } from 'src/app/model/moniteur.model';

@Injectable({
  providedIn: 'root'
})
export class MoniteurService {

    constructor(private http: HttpClient) { }

    getMoniteurs(): Observable<Moniteur[]> {
        return this.http.get<Moniteur[]>(API.Listmoniteur)
    }

    getMoniteursByID(id: number): Observable<Moniteur> {
        return this.http.get<Moniteur>(API.getmoniteurByID + id)
    }

    register(Moniteur): Observable<any> {
        return this.http.post(API.add_moniteur, Moniteur);
    }

    destroy(Moniteur:any) : Observable<any> {
        return this.http.delete(API.Deletemoniteur + Moniteur.id );
    }

    update_mon(Moniteur:any,id:any) : Observable<any> {
        return this.http.put(API.updatemoniteur + id ,Moniteur);
    }

}


