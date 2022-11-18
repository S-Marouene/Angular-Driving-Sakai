import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { Conduite } from 'src/app/model/conduite.model';

@Injectable({
  providedIn: 'root'
})
export class ConduiteService {

    constructor(private http: HttpClient) { }

    getConduitesCondidat(id): Observable<Conduite[]> {
        return this.http.get<Conduite[]>(API.ListconduiteCondidat + id)
    }

    getConduitesCalendar(): Observable<Conduite[]> {
        return this.http.get<Conduite[]>(API.getConduitesFrCalendar)
    }

    getConduites(): Observable<Conduite[]> {
        return this.http.get<Conduite[]>(API.Listconduite)
    }

    getConduitesByID(id: number): Observable<Conduite> {
        return this.http.get<Conduite>(API.getconduiteByID + id)
    }

    register(Conduite): Observable<any> {
        return this.http.post(API.add_conduite, Conduite);
    }

    destroy(id:any) : Observable<any> {
        return this.http.delete(API.Deleteconduite + id );
    }

    update_cond(Conduite:any,id:any) : Observable<any> {
        return this.http.put(API.updateconduite + id ,Conduite);
    }

}
