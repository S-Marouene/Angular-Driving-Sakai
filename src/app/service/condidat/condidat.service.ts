import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { Condidat } from 'src/app/model/condidat.model';

@Injectable({
  providedIn: 'root'
})
export class CondidatService {

  constructor(private http: HttpClient) { }

    getCondidats(): Observable<Condidat[]> {
        return this.http.get<Condidat[]>(API.ListCondidat)
    }

    getCondidatsByID(id: number): Observable<Condidat> {
        return this.http.get<Condidat>(API.getCondidatByID + id)
    }

    register(condidat): Observable<any> {
        return this.http.post(API.add_condidat, condidat);
    }

    destroy(condidat:any) : Observable<any> {
        return this.http.delete(API.DeleteCondidat + condidat.id );
    }

    update_cond(form) : Observable<any> {
        return this.http.post(API.updateCondidat ,form);
    }


}
